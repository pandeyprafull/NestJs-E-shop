import { IsIn, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class ExternalSignIn {

    @IsString()
    @IsNotEmpty()
    code: string;

    @IsIn(['google', 'facebook'])
    @IsNotEmpty()
    provider: string;

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    token?: string;
}