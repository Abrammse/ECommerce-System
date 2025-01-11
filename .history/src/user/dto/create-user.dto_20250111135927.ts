import { IsString } from "class-validator";

export class CreateUserDto {
    @IsString({message:"namne "})
    name: string;
    email: string;
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
