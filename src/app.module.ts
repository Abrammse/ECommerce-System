import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ ConfigModule.forRoot(),MongooseModule.forRoot('mongodb://127.0.0.1:27017/ecommorce'), 
    UserModule,
    JwtModule.register({
    global: true,
    secret:   process.env.JWT_SECRET,
    signOptions: { expiresIn: '1h' },
  }) ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
