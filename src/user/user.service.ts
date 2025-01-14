import { HttpException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Request } from 'express';
import * as bcrypt from 'bcrypt';
import { console } from 'inspector';
const saltOrRounds = 10;
@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private usermodel: Model<User>,
  ) {}

 async create(createUserDto: CreateUserDto) : Promise<{ status: number; message: string; data:User }> {
   const isExitUser = this.usermodel.findOne({ email : createUserDto.email})
   .then((isExitUser) => {
    console.log(isExitUser);
    if (isExitUser) {
      throw new HttpException("The user already exists", 400);
    }
    // Proceed with further logic here
  })
  .catch((error) => {
    console.error("Error occurred while checking user:", error);
    throw new HttpException("An internal server error occurred", 500);
  });
  const password = await bcrypt.hash(createUserDto.password, saltOrRounds);

  const role = createUserDto.role ?? "User";
   const user ={ password,isExitUser,role,Active:true }
    return {
      status:200,
      message:"the user add successfully",
      data: await this.usermodel.create({ status:200,...createUserDto ,...user })
    }
  }

  findAll() {
    return this.usermodel.find().select('-password -__v');
  }
  

  async findOne(id: string): Promise<{ status: number; data:User }> {
    try {
      // Find the user by ID and exclude specific fields
      const user = await this.usermodel.findById(id).select('-password -__v');
  
      // Check if the user exists
      if (!user) {
        throw new HttpException("The user not found", 404);
      }
  
      return {
        status: 200,
        data: user,
      };
    } catch (error) {
      console.error("Error occurred while retrieving user:", error);
      throw new HttpException("An internal server error occurred", 500);
    }
  }
  
  async update(id: string, updateUserDto: UpdateUserDto): Promise<{ status: number; message: string; data: User }> {

    const existingUser = await this.usermodel.findById(id).select('-password -__v');

    if (!existingUser) {
        throw new HttpException("The user not found", 404);
    }

    let user = {
        ...updateUserDto,
    };

    if (updateUserDto.password) {
        const hashedPassword = await bcrypt.hash(updateUserDto.password, saltOrRounds);
        user = { ...user, password: hashedPassword };
    }

    const updatedUser = await this.usermodel.findByIdAndUpdate(id, user, {
        new: true,
    });

    return {
        status: 200,
        message: "The user updated successfully",
        data: updatedUser,
    };
}

  async remove(id: string): Promise<{ status: number; message: string;}> {
    // Find the user by ID, excluding sensitive fields
    const user = await this.usermodel.findById(id).select('-password -__v');
  
    if (!user) {
      throw new HttpException("The user was not found", 404);
    }
  
    // Delete the user
    await this.usermodel.findByIdAndDelete(id).select('-password -__v');
  
    // Return success response with the deleted user's data
     return {
      status: 200,
      message: "The user was deleted successfully",
   
    };
  }
}
