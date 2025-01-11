import { IsString } from "class-validator";

export class CreateUserDto {
    @IsString({message:"namne must be a string"})
    name: string;
    @IsString({message:"namne must be a string"})

    email: string;

    @IsString({message:"namne must be a string"})

    password: string;
    role: string;
    Avatar: string;
    Age: string;
    PhoneNumber: string;
    Address: string;
    Active: string;
    VerificationCode: string;
    gender: string;




}
