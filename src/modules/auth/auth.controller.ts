import { HttpService } from '@nestjs/axios';
import { Body, Controller, Get, Post, Query, HttpException } from '@nestjs/common';
import { SignInBody } from '../user/DTO';
import { AuthService } from './auth.service';
import { ExternalSignIn } from './DTO';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly httpService: HttpService
    ) { }
    @Post('signin')
    async SignIn(@Body() body: SignInBody) {
        return this.authService.signIn(body)

    }

    @Post('signin/external')
    async externalSignIn(@Body() body: ExternalSignIn) {
        return this.authService.externalSignIn(body)

    }

    //create to test Oauth
    @Get('/test')
    async generateCode(@Query() query: any) {
        console.log("---- query ----", query)
        const body = {
            provider: 'google',
            code: query.code
        }
        console.log("body ------>", body)
       let result = await this.httpService.post('http://localhost:3000/auth/signin/external', body).toPromise()
            .catch(e => {
                // console.log("e ------>", e.response.data)
                throw new HttpException(e.response.data.message, e.response.status);
            })

            return {
                message: 'Success',
                ...result.data
            }
    }
}
