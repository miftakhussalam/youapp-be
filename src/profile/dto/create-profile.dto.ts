import { IsDateString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateProfileDto {
  @IsNotEmpty()
  email: string;

  @IsOptional()
  username?: string;

  @IsOptional()
  name?: string;

  @IsOptional()
  zodiac?: string;

  @IsOptional()
  horoscope?: string;

  @IsOptional()
  @IsDateString()
  birthday?: string;

  @IsOptional()
  height?: number;

  @IsOptional()
  weight?: number;

  @IsOptional()
  interests?: string[];
}
