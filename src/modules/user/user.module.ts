import { Global, Module } from '@nestjs/common';
import { HelperModule } from '../helper/helper.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Global()
@Module({
  // imports: [HelperModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
