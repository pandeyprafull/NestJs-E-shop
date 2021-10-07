/**
 * @author Prafull Pandey <prafullpandey68@gmail.com>
 * Entry point for Application
 */
import * as morgan from 'morgan'
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './modules/appRoot/app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.use(morgan('common'))
  await app.listen(3000, () => console.log(`API is now live on Server `, app.getHttpServer().address().port));
}
bootstrap();
