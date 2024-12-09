import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from "@nestjs/common";
import { CreateCustomerDto } from "./dto/create-customer.dto";
import { UpdateCustomerDto } from "./dto/update-customer.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Customer } from "./entities/customer.entity";
import { PaginationDto } from "src/common/dtos/pagination.dto";
import { isUUID } from "class-validator";

@Injectable()
export class CustomersService {
  private readonly logger = new Logger("CustomersService");

  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>
  ) {}

  async create(createCustomerDto: CreateCustomerDto) {
    try {
      const customer = this.customerRepository.create(createCustomerDto);
      await this.customerRepository.save(customer);

      return customer;
    } catch (error) {
      this.handleDBException(error);
    }
  }

  async findAll(paginatioDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginatioDto;
    const [data, count] = await this.customerRepository.findAndCount({
      take: limit,
      skip: offset,
      order: {
        name: "ASC",
      },
    });

    return {
      data,
      meta: {
        totalItems: count,
        limit,
        offset,
        totalPages: Math.ceil(count / limit),
        currentPage: Math.floor(offset / limit) + 1,
      },
    };
  }

  async findOne(term: string) {
    let customer: Customer;

    if (isUUID(term)) {
      customer = await this.customerRepository.findOneBy({ id: term });
    } else {
      const queryBuilder = this.customerRepository.createQueryBuilder();
      customer = await queryBuilder
        .where(`UPPER(name) =:name`, {
          name: term.toUpperCase(),
        })
        .getOne();
    }
    if (!customer) {
      throw new NotFoundException(`Area with term ${term} not found`);
    }
    return customer;
  }

  async searchCustomers(
    term: string,
    paginationDto: PaginationDto
  ): Promise<{ data: Customer[]; meta: any }> {
    const { limit = 10, offset = 0 } = paginationDto;
    let customer: Customer[] = [];
    let count = 0;

    if (isUUID(term)) {
      const area = await this.customerRepository.findOneBy({ id: term });
      if (area) {
        customer.push(area);
        count = 1;
      }
    } else {
      const queryBuilder = this.customerRepository.createQueryBuilder();
      [customer, count] = await queryBuilder
        .where(`UPPER(name) LIKE :name`, {
          name: `%${term.toUpperCase()}%`,
        })
        .skip(offset)
        .take(limit)
        .getManyAndCount();
    }

    return {
      data: customer,
      meta: {
        totalItems: count,
        limit,
        offset,
        totalPages: Math.ceil(count / limit),
        currentPage: Math.floor(offset / limit) + 1,
      },
    };
  }

  async update(id: string, updateCustomerDto: UpdateCustomerDto) {
    const customer = await this.customerRepository.preload({
      id: id,
      ...updateCustomerDto,
    });

    if (!customer)
      throw new NotFoundException(`Customer with id: ${id} not found`);

    try {
      await this.customerRepository.save(customer);
      return customer;
    } catch (error) {
      this.handleDBException(error);
    }
  }

  async remove(id: string) {
    const customer = await this.findOne(id);

    await this.customerRepository.remove(customer);
    return customer;
  }

  private handleDBException(error: any) {
    if (error.code === "23505") {
      throw new BadRequestException(error.detail);
    }
    this.logger.error(error);
    throw new InternalServerErrorException(
      "Unexpected error ocurred. Please try again later."
    );
  }
}
