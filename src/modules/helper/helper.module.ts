import { Global, Module } from '@nestjs/common';
import { HelperController } from './helper.controller';
import { HelperService } from './helper.service';

@Global()
@Module({
  controllers: [HelperController],
  providers: [HelperService],
  exports: [HelperService]
})
export class HelperModule {}
