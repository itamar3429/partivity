import { Injectable } from '@nestjs/common';
import { IsDateString, IsNumber, IsString } from 'class-validator';

@Injectable()
export class AddScheduleDto {
  @IsDateString()
  start: Date;

  @IsDateString()
  end: Date;

  @IsString()
  title: string;

  @IsNumber()
  price: number;
}

@Injectable()
export class EditScheduleDto {
  @IsDateString()
  start: Date;

  @IsDateString()
  end: Date;

  @IsNumber()
  service_id: number;

  @IsString()
  title: string;

  @IsNumber()
  price: number;
}
