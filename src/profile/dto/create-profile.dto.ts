import { IsNotEmpty, IsOptional, IsDateString } from 'class-validator';

export class CreateProfileDto {
  @IsNotEmpty()
  user: string; // userId dari User collection

  @IsOptional()
  firstName?: string;

  @IsOptional()
  lastName?: string;

  @IsOptional()
  zodiac?: string;

  @IsOptional()
  horoscope?: string;

  @IsOptional()
  @IsDateString()
  birthDate?: string;

  @IsOptional()
  bio?: string;
}
