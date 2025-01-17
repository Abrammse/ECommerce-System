import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController, UserMeController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user.schema';
import { NotificationsGateway } from './webgetaway/user.getaway';

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
  controllers: [UserController,UserMeController],
  providers: [UserService,NotificationsGateway],
})
export class UserModule {}
