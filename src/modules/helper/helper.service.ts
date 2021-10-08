import { Injectable, forwardRef, Inject } from '@nestjs/common';
import { scrypt } from 'crypto';
import { UserService } from '../user/user.service';

@Injectable()
export class HelperService {
    private readonly SALT: string = 'CZyBg3pQYJ-8lMVOWzvLY-4kjHBcMqLH-FpIgsxuTUp';
    private readonly HASH_LENGTH = 100;
    constructor(
        @Inject(forwardRef(() => UserService))
        private readonly userService: UserService
    ) { }

    // Cryptographically password hash
    async hashPassword(pwd: string): Promise<string> {
        return new Promise((resolve, reject) => {
            scrypt(
                pwd,
                this.SALT,
                this.HASH_LENGTH,
                { N: 64 },
                (err, hash) => {
                    if (err) reject(err);
                    resolve(hash.toString('base64'));
                });
        });
    }

    //verify password
    async validatePassword(hash: string, pwd: string): Promise<boolean> {
       return hash === await this.hashPassword(pwd)
    }
}
