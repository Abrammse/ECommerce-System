import { HttpException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Request } from 'express';
import * as bcrypt from 'bcrypt';
import { console } from 'inspector';
import { NotificationsGateway } from './webgetaway/user.getaway';
const saltOrRounds = 10;
@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private usermodel: Model<User>,
   private readonly notificationsGateway: NotificationsGateway, 
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
   const newuser = await this.usermodel.create({ status:200,...createUserDto ,...user })
   this.notificationsGateway.sendNotification('user_created', newuser);
   console.log(newuser)
    return {
      status:200,
      message:"the user add successfully",
      data: newuser
    }
  }

   async findAll(query) {
    const {limit=1000_000_000,skip=0,sort= 'asc',name,role,email}= query;

    
    if (Number.isNaN(Number(+limit))) {
      throw new HttpException('invalid limit',400);
    
     }


     if (Number.isNaN(Number(+skip))) {
    throw new HttpException('invalid number',400);
    
   }

  if (!['asc', 'desc'].includes(sort))  {
      throw new HttpException('invalid number',400);
    
    }
    const users = await this.usermodel
      .find()
      .skip(skip)
      .limit(limit)

      .sort({ name: sort })
      .where('name', new RegExp(name, 'i'))
      .where('email', new RegExp(email, 'i'))
      .where('role', new RegExp(role, 'i'))
      .sort({ name: sort })
      .select('-password -__v')
      .exec();
    return {
      status:200,
      message:"the user find successfully",
      length:users.length,
      query: users
    }
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


  async getMe(Payload) {


    if (!Payload._id) {
      throw new HttpException("The id was not found", 404);
    }
    const user = await this.usermodel.findById(Payload._id).select('-password -__v');


    if (!user) {
      throw new HttpException("The user was not found", 404);
    }
    return {
      status: 200,
      message: "The user was deleted successfully",
      data:user
    };
  }

  async updateMe(Payload, updateUserDto: UpdateUserDto) {


    if (!Payload._id) {
      throw new HttpException("The id was not found", 404);
    }
    const user = await this.usermodel.findById(Payload._id).select('-password -__v');


    if (!user) {
      throw new HttpException("The user was not found", 404);
    }


    const updatedUser = await this.usermodel.findByIdAndUpdate(Payload._id, updateUserDto, {
      new: true,
  }).select('-password -__v');
    return {
      status: 200,
      message: "The user was deleted successfully",
      data: updatedUser
  }
}
async deleteMe(Payload) :Promise<void>{
  const user = await this.usermodel.findById(Payload._id).select('-password -__v');

  if (!user) {
    throw new HttpException("The user was not found", 404);
  }


  const updatedUser = await this.usermodel.findByIdAndUpdate(Payload._id,{active:false ,new:true }, 
  ).select('-password -__v');


}
}
