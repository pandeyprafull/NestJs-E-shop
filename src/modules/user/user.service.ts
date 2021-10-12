import { Injectable, forwardRef, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role, User } from '@shop_org/schemas';
import { Repository } from 'typeorm';
import { HelperService } from '../helper/helper.service';
import { CreateUserBody } from './DTO';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        // @Inject(forwardRef(() => HelperService))
        private readonly helperService: HelperService
    ) { }
    getRepo() {
        return this.userRepository;
    }

    async getMe(user: User) {
        const userDetails =  await this.getRepo().createQueryBuilder('user')
            .select()
            .where('user.id = :userId', { userId: user.id })
            .getOne();

            delete userDetails.password;
            return userDetails;
    }

    async createUser(body: CreateUserBody) {
        const user = new User();

        //compulsory fields
        user.first_name = body.first_name;
        user.last_name = body.last_name;
        user.email = body.email.toLowerCase();
        user.password = await this.helperService.hashPassword(body.password)

        //optional
        if (body.phone_number) user.phone_number = body.phone_number;
        if (body.role) user.role = Role[body.role];
        await this.userRepository.save(user);

        return { message: "User Create SuccessFully", user: user.id }

    }
}
