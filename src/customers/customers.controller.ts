import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseUUIDPipe,
} from "@nestjs/common";
import { CustomersService } from "./customers.service";
import { CreateCustomerDto } from "./dto/create-customer.dto";
import { UpdateCustomerDto } from "./dto/update-customer.dto";
import { PaginationDto } from "src/common/dtos/pagination.dto";

@Controller("customers")
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Post()
  create(@Body() createCustomerDto: CreateCustomerDto) {
    return this.customersService.create(createCustomerDto);
  }

  @Get()
  findAll(@Query() paginatioDto: PaginationDto) {
    return this.customersService.findAll(paginatioDto);
  }

  @Get("term/find")
  findOne(@Query("term") term: string) {
    return this.customersService.findOne(term);
  }

  @Get("search")
  search(@Query() paginationDto: PaginationDto, @Query("term") term: string) {
    return this.customersService.searchCustomers(term, paginationDto);
  }

  @Patch(":id")
  update(
    @Param("id", ParseUUIDPipe) id: string,
    @Body() updateCustomerDto: UpdateCustomerDto
  ) {
    return this.customersService.update(id, updateCustomerDto);
  }

  @Delete(":id")
  remove(@Param("id", ParseUUIDPipe) id: string) {
    return this.customersService.remove(id);
  }
}
