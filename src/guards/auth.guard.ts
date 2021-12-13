import {
  ArgumentsHost,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ErrorService } from '../modules/error/error.service';
// import { HelperService } from "src/modules/helper/helper.service";
// import { UserService } from "src/modules/user/user.service";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    // private readonly helperService: HelperService,
    // private readonly userService: UserService,
    private readonly errorService: ErrorService,
    private readonly jwtService: JwtService,
  ) {}

  async canActivate(ctx: ExecutionContext): Promise<boolean> {
    const request = ctx.switchToHttp().getRequest();
    const authorizationHeader: string =
      request.headers['authorization'] || request.headers['Authorization'];

    if (authorizationHeader) {
      const token = authorizationHeader.split(' ')[1];
      console.log('token----->', token);
      const signedUser = this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET,
      });
      console.log('----- signedUser ----');
      console.dir(signedUser, { depth: null });

      request.user = signedUser;
      return true;
    } else {
      this.errorService.throwError(
        'NOT_FOUND',
        `Token not found`,
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
