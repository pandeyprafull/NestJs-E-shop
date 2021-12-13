import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SignInDTO {
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsEmail()
  @IsString()
  @IsNotEmpty()
  password: string;
}
