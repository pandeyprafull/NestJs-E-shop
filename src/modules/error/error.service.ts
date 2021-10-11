import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class ErrorService {

    throwError(type: string, message: string, code: HttpStatus){
        throw new HttpException({error: type, message}, code)

    }
}
