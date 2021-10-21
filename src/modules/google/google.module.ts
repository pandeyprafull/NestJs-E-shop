import { Global, Module } from '@nestjs/common';
import { GoogleController } from './google.controller';
import { GoogleService } from './google.service';

@Global()
@Module({
  controllers: [GoogleController],
  providers: [GoogleService],
  exports: [GoogleService]
})
export class GoogleModule {}
