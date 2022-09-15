import { Injectable } from '@nestjs/common';
import { IsDateString, IsNumber, IsString } from 'class-validator';

@Injectable()
export class AddEventDto {
  @IsString()
  name: string;

  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsDateString()
  date: string;
}
