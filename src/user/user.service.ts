import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Request } from 'express';
import * as bcrypt from 'bcrypt';
const saltOrRounds = 10;
@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private usermodel: Model<User>,
  ) {}

create(createUserDto: CreateUserDto) {

    return this.usermodel.create(createUserDto);
  }

  findAll() {
    return this.usermodel.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
function InjectRepository(Patients: any): (target: typeof UserService, propertyKey: undefined, parameterIndex: 0) => void {
  throw new Error('Function not implemented.');
}

