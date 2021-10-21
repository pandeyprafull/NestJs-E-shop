import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

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
}
