import { IsString, IsNotEmpty, IsEmail } from 'class-validator';


export class UserDto {
    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string;
  
    @IsString()
    @IsNotEmpty()
    username: string;
  
    @IsString()
    @IsNotEmpty()
    password: string;
}

export class LoginDto {
    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string;
  
    @IsString()
    @IsNotEmpty()
    password: string;
}