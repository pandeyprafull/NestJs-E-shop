import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { HelperService } from '../helper/helper.service';
import { Role, User } from '@shop_org/schemas';
import * as qs from 'querystring';
import { CreateUserBody } from '../user/DTO';


@Injectable()
export class GoogleService {
    constructor(
        private readonly httpService: HttpService,
        private readonly userService: UserService,
        private readonly helperService: HelperService
    ) { }

    // google signIn
    async signIn(code: string) {
        const { access_token, refresh_token } = await this.genToken(code)

        const profile = await this.getProfile(access_token)
        console.log("Google profile ----->", profile)

        let user = await this.userService.getRepo().createQueryBuilder('user')
            .select()
            .where('user.email = :email', { email: profile.email })
            .getOne();
        // console.log("user Exist ---->", user)

        if (!user) {
            console.log("Inside  ----->1")
            throw new HttpException(`Email '${profile.email}' does not exist!`, HttpStatus.NOT_FOUND);
        }
        else {
            console.log("Inside  ----->2")
            // cause data come from google login
            user.is_email_verified = true;
            await this.userService.getRepo().save(user);
        }

        //save user token in DB
        const token = this.helperService.generateToken(user);

        return {
            message: `Login Success`,
            success: true,
            token: token
        }


    }
    //google user profile
    async getProfile(token: string) {
        try {
            const { data } = await this.httpService.get(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json`, {
                headers: { 'Authorization': `Bearer ${token}` }
            }).toPromise()

            // console.log(`---- Google login Detected ---`, data)
            return data
        } catch (error) {
            // console.log("error ---->", error.message)
            throw new HttpException({
                message: `Error while verifying token from google`,
                error
            }, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    //gen access, refresh token using auth_code
    async genToken(code: string) {
        try {
            const tokenAR = await this.httpService.post('https://oauth2.googleapis.com/token', qs.stringify({
                code: code,
                client_id: process.env.GOOGLE_CLIENT_ID,
                client_secret: process.env.GOOGLE_CLIENT_SECRET,
                redirect_uri: process.env.GOOGLE_REDIRECT_URI,
                grant_type: 'authorization_code'
            }), {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).toPromise()

            console.log("Data ------>")
            console.dir(tokenAR.data, { depth: null })
            const { access_token, refresh_token } = tokenAR.data

            return { access_token, refresh_token };
        } catch (error) {
            console.log('Error ---->', error)
            throw new HttpException(`Google Graph API error.`, HttpStatus.INTERNAL_SERVER_ERROR);

        }

    }
}
