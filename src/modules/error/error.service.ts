import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ErrorType } from 'src/constants/types';

@Injectable()
export class ErrorService {
  throwError(type: ErrorType, message: string, code: HttpStatus) {
    throw new HttpException({ error: type, message }, code);
  }
}
