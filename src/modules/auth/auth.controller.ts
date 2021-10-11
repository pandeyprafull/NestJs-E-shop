import { Body, Controller, Post } from '@nestjs/common';
import { SignInBody } from '../user/DTO';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) { }
    @Post('signin')
    async SignIn(@Body() body: SignInBody) {
        return this.authService.signIn(body)

    }

}
