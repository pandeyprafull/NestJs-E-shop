import { Role } from '@shop_org/schemas';
import {
  IsEmail,
  IsEnum,
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateUserBody {
  @MaxLength(50, { message: 'First name should be max 50 charaters' })
  @IsString()
  @IsNotEmpty()
  first_name: string;

  @MaxLength(50, { message: 'last name should be max 50 characters' })
  @IsString()
  @IsNotEmpty()
  last_name: string;

  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsOptional()
  phone_number?: string;

  @IsEnum(Role, {
    message: `$property must be one of '${Object.values(Role).filter(
      (val) => !+val,
    )}'`,
  })
  @IsString()
  @IsOptional()
  role?: string;
}
