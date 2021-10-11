/**
 * Root Module for the App
 */

 import { Global, Module } from '@nestjs/common';
 import { TypeOrmModule } from '@nestjs/typeorm';
 import { AppController } from './app.controller';
 import { AppService } from './app.service';
 import { HttpModule } from '@nestjs/axios';
 import { JwtModule } from '@nestjs/jwt';
 import { getEntities } from '@shop_org/schemas'

 import * as modules from '../index';

 import { MulterModule } from '@nestjs/platform-express';

 @Global()
 @Module({
   imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URI,
      // ssl: { rejectUnauthorized: false },
      synchronize: process.env?.LOCAL === 'true' ?  true : false,
      logging: process.env?.LOCAL === 'true' ? ['error', 'warn', 'query'] : false,
      entities: [
        ...getEntities()
      ],
      autoLoadEntities: true
    }),
    TypeOrmModule.forFeature(getEntities()),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {algorithm: 'HS256', expiresIn: '69d'}
    }),
     HttpModule,
     ...Object.values(modules)
   ],
   controllers: [AppController],
   providers: [AppService],
   exports: [
     TypeOrmModule,
     AppService,
     HttpModule,
     JwtModule
   ]
 })
 export class AppModule {}


