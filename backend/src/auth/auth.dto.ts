import { IsString, IsNotEmpty, IsEmail, MinLength, MaxLength, maxLength } from 'class-validator';
import { Match } from 'src/decorators/match.decorator';

export class RegisterDto {
    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string;
  
    @IsString()
    @IsNotEmpty()
    @MinLength(4)
    @MaxLength(20)
    username: string;
  
    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    @MaxLength(16)
    password: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    @MaxLength(16)
    @Match('password')
    confirmPassword: string;
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