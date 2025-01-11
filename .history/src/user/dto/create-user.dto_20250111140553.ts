import { IsString } from "class-validator";

export class CreateUserDto {
    @IsString({message:"name must be a string"})
    @M
    name: string;
    @IsString({message:"email must be a string"})

    email: string;

    @IsString({message:"password must be a string"})

    password: string;

    @IsString({message:"role must be a string"})
    role: string;
    @IsString({message:"Avatar must be  image"})

    Avatar: string;

    Age: number;
    PhoneNumber: number;

    @IsString({message:"Address must be a string"})
    Address: string;

    Active: boolean;


    @IsString({message:"VerificationCode must be a string"})

    VerificationCode: string;

    @IsString({message:"gender must be a string"})

    gender: string;




}
