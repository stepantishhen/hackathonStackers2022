import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class LoginDTO {
  @IsEmail()
  email!: string;

  @IsString()
  @MaxLength(50)
  @MinLength(8)
  password!: string;
}
