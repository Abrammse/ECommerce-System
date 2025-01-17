import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
import { MongooseModule } from '@nes';tjs/mongoose
  imports: [MongooseModule.forRoot(mongodb://localhost:27017/),
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
