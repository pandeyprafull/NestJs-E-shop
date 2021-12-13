import { Global, Module } from '@nestjs/common';
import { ErrorController } from './error.controller';
import { ErrorService } from './error.service';

@Global()
@Module({
  controllers: [ErrorController],
  providers: [ErrorService],
  exports: [ErrorService],
})
export class ErrorModule {}
