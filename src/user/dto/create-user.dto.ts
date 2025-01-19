import { IsBoolean, IsEmail, IsEnum, IsNumber, IsOctal, IsOptional, IsPassportNumber, IsPhoneNumber, IsString, IsUrl, Length, Max, MaxLength, Min, MinLength } from "class-validator";

export class CreateUserDto {
    @IsString({message:"name must be a string"})
    @MinLength(3,{message: "name is short"})
    @MaxLength(9,{message: "name is big "})
    name: string;


    //email//
    @IsString({ message: "email must be a string" })
    @IsEmail({}, { message: "Email is not valid" })
    email: string;


   //password//
    @IsString({message:"password must be a string"})
    @MinLength(3,{message: "password is small"})
    @MaxLength(8,{message: "password is big "})
    password: string;



    //role//
    @IsString({message:"role must be a string"})
    @IsEnum(['user' , 'admin'], {message:"role must be a user or admin "})
    @IsOptional()
    role: string;


    @IsString({message:"Avatar must be  image"})
    @IsUrl({},{message:"Avatar must be  url "})
    @IsOptional()
    Avatar: string;

    @IsNumber({},{message:"Age must be Number"})
    @Min(18,{message: "Age under 18"})
    @IsOptional()
    Age: number;


   @IsString({ message: "Name must be a string" })
   @IsPhoneNumber('EG', { message: "Phone is not valid" })
   @IsOptional()
    PhoneNumber: string;

    @IsString({message:"Address must be a string"})
    @IsOptional()
    Address: string;



    @IsBoolean({message:"Address must be a Active or not Active"})
    @IsEnum([true,false],{message:"Active must be a true or folsa "})
    @IsOptional()
    Active: boolean;


    @IsString({message:"VerificationCode must be a string"})
    @Length(6,6,{message: "password is small"})
    @IsOptional()
    VerificationCode: string;

 
    @IsEnum(['male' , 'female' ] ,{message:"gender must be a male or female "})
    @IsOptional()
     gender: string;




}
