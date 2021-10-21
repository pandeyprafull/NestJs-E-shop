import { Body, Controller, Post } from '@nestjs/common';
import { SignInBody } from '../user/DTO';
import { AuthService } from './auth.service';
import { ExternalSignIn } from './DTO';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) { }
    @Post('signin')
    async SignIn(@Body() body: SignInBody) {
        return this.authService.signIn(body)

    }

    @Post('signin/external')
    async externalSignIn(@Body() body: ExternalSignIn){
        return this.authService.externalSignIn(body)

    }


}
