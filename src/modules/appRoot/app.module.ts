/**
 * Root Module for the App
 */

 import { Global, Module } from '@nestjs/common';
 import { TypeOrmModule } from '@nestjs/typeorm';
 import { AppController } from './app.controller';
 import { AppService } from './app.service';
 import { HttpModule } from '@nestjs/axios';

//  import * as modules from '../index';

 import { MulterModule } from '@nestjs/platform-express';

 @Global()
 @Module({
   imports: [

     HttpModule,
    //  ...Object.values(modules)
   ],
   controllers: [AppController],
   providers: [AppService],
   exports: []
 })
 export class AppModule {}


