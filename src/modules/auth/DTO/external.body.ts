import { IsIn, IsNotEmpty, IsString } from 'class-validator';

export class ExternalSignIn {

    @IsString()
    @IsNotEmpty()
    token: string;

    @IsIn(['google', 'facebook'])
    @IsNotEmpty()
    provider: string;
}