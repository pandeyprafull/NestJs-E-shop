import { Global, Module } from '@nestjs/common';
import { FacebookController } from './facebook.controller';
import { FacebookService } from './facebook.service';

@Global()
@Module({
  controllers: [FacebookController],
  providers: [FacebookService],
  exports: [FacebookService]
})
export class FacebookModule {}
