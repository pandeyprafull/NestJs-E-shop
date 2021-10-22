import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as qs from 'querystring';

@Injectable()
export class GoogleService {
    constructor(
        private readonly httpService: HttpService
    ) { }
    //google signIn
    async signIn(token: string) {
        const { data } = await this.httpService.get(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json`, {
            headers: { 'Authorization': `Bearer ${token}` }
        }).toPromise()
            .catch(err => {
                throw new HttpException({
                    message: `Error while vrifying token from google`,
                    err
                }, HttpStatus.INTERNAL_SERVER_ERROR)
            })
console.log(`---- Google login Detected ---`, data)
    }

    async genToken(code: string){
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
          }).toPromise();

    }
}
