import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';

@Module({
  imports: [MongooseModulE.forFeature([{ name: Cat.name, schema: CatSchema }])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
