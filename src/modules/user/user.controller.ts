import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { User } from '@shop_org/schemas';
import { AuthGuard } from '../../guards';
import { CreateUserBody } from './DTO'
import { UserService } from './user.service';


@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Get('me')
    @UseGuards(AuthGuard)
    async getMe(@Req() req: any) {
        const user: User = req.user;
        return await this.userService.getMe(user)
    }

    @Post('signup')
    async createUser(@Body() body: CreateUserBody) {
        return this.userService.createUser(body)
    }

}
