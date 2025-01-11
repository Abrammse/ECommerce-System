import { IsString } from "class-validator";

export class CreateUserDto {
    @IsString({message:"namne must be a string"})
    name: string;
    @IsString({message:"namne must be a string"})

    email: string;

    @IsString({message:"namne must be a string"})

    password: string;

    @IsString({message:"namne must be a string"})
    role: string;
    @IsString({message:"namne must be a string"})

    Avatar: string;

    Age: number;
    PhoneNumber: number;

    @IsString({message:"Address must be a string"})
    Address: string;

    Active: boolean;


    @IsString({message:"VerificationCode must be a string"})

    VerificationCode: string;

    @IsString({message:"namne must be a string"})

    gender: string;




}
