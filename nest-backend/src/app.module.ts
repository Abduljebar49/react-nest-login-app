import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/auth.guard';
import { MongooseModule } from '@nestjs/mongoose';
import * as dotenv from 'dotenv'

dotenv.config();

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGODB,{dbName: 'userdb'}),
    AuthModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
