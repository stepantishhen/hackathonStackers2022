import {
  IsDate,
  IsDateString,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateEventDTO {
  @IsString()
  @MaxLength(100)
  @MinLength(1)
  name!: string;

  @IsString()
  @MaxLength(2000)
  @MinLength(1)
  description!: string;

  @IsString()
  @MaxLength(50)
  @MinLength(1)
  date!: string;

  @IsString()
  @MaxLength(100)
  @MinLength(1)
  place!: string;
}
