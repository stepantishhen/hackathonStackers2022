import {
  IsEmail,
  IsInt,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDTO {
  @IsEmail()
  email!: string;

  @IsString()
  @MaxLength(50)
  @MinLength(8)
  password!: string;

  @IsString()
  @MaxLength(50)
  @MinLength(1)
  firstName!: string;

  @IsString()
  @MaxLength(50)
  @MinLength(1)
  surname!: string;

  @IsString()
  @MaxLength(50)
  @MinLength(1)
  patronymic!: string;

  @IsInt()
  age!: number;
}
