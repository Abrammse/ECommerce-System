import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Mongoose } from 'mongoose';

@Module({
  imports: [
    Mongoose.forRoot({
      load: [databaseConfig],
      envFilePath: '.env',
      isGlobal: true,
    }),
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
