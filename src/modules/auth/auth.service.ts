import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ErrorService } from '../error/error.service';
import { HelperService } from '../helper/helper.service';
import { SignInBody } from '../user/DTO';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly helperService: HelperService,
        private readonly errorService: ErrorService
    ) { }
    async signIn(body: SignInBody) {
        const email = body.email;
        const user = await this.userService.getRepo().createQueryBuilder('user')
            .select([
                'user.id',
                'user.email',
                'user.password',
                'user.role',
                'user.token'
            ])
            .where('user.email = :email', { email })
            .getOne();
        if (!user) throw new HttpException(`User with ${email} not exist!!`, HttpStatus.NOT_FOUND);

        let validPwd = await this.helperService.validatePassword(user.password, body.password)

        if (!validPwd) this.errorService.throwError('BAD_REQUEST', `Wrong Password`, HttpStatus.BAD_REQUEST)

        //save user token in DB
        const token = this.helperService.generateToken(user);
        console.dir(token, { depth: null });

        user.token = token;
        await this.userService.getRepo().save(user);

        return {
            message: `Login Success`,
            action: true,
            token: token
        }
    }
}
