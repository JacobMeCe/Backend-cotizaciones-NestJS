import { IsString, MinLength } from "class-validator";

export class CreateCustomerDto {
  @IsString()
  @MinLength(5)
  name: string;

  @IsString()
  @MinLength(5)
  address: string;

  @IsString()
  @MinLength(5)
  email: string;

  @IsString()
  @MinLength(5)
  phone_number: string;
}
