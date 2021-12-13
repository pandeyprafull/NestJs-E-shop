import { Injectable, forwardRef, Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@shop_org/schemas';
import { scrypt } from 'crypto';
import { UserService } from '../user/user.service';

@Injectable()
export class HelperService {
  private readonly SALT: string = 'CZyBg3pQYJ-8lMVOWzvLY-4kjHBcMqLH-FpIgsxuTUp';
  private readonly HASH_LENGTH = 100;
  constructor(
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  // Cryptographically password hash
  async hashPassword(pwd: string): Promise<string> {
    return new Promise((resolve, reject) => {
      scrypt(pwd, this.SALT, this.HASH_LENGTH, { N: 64 }, (err, hash) => {
        if (err) reject(err);
        resolve(hash.toString('base64'));
      });
    });
  }

  //verify password
  async validatePassword(hash: string, pwd: string): Promise<boolean> {
    return hash === (await this.hashPassword(pwd));
  }

  // Generates a JWT for a successfully signed in user
  generateToken(user: Partial<User>) {
    console.log('----->', user);
    const payload = {
      id: user.id,
      role: user.role,
    };
    const token = this.jwtService.sign(payload);
    console.dir(token, { depth: null });
    return token;
  }
}
