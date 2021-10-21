import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ErrorService } from '../error/error.service';
import { FacebookService } from '../facebook/facebook.service';
import { GoogleService } from '../google/google.service';
import { HelperService } from '../helper/helper.service';
import { SignInBody } from '../user/DTO';
import { UserService } from '../user/user.service';
import { ExternalSignIn } from './DTO';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly helperService: HelperService,
        private readonly errorService: ErrorService,
        private readonly googleService: GoogleService,
        private readonly facebookService: FacebookService
    ) { }
    async signIn(body: SignInBody) {
        const email = body.email.toLowerCase();
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
        // console.dir(token, { depth: null });

        user.token = token;
        await this.userService.getRepo().save(user);

        return {
            message: `Login Success`,
            action: true,
            token: token
        }
    }

    async externalSignIn(body: ExternalSignIn) {
        switch (body.provider) {
            case 'google': {
                return this.googleService.signIn(body.token)
            } break;
            case 'facebook': {
                return this.facebookService.signIn(body.token)
            }
            default: throw new HttpException('Unknown Provider', HttpStatus.BAD_REQUEST)
        }
    }
}
