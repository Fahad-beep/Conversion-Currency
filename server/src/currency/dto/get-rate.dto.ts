/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsOptional, IsString, Length, IsDateString } from 'class-validator';

export class GetRateDto {
  @IsOptional()
  @IsString()
  @Length(3, 3)
  base?: string;

  @IsOptional()
  @IsDateString()
  date?: string;
}
