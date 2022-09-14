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

export class getServicesDto {
  @IsDateString()
  date: Date;
}

export class addEventServiceDto {
  @IsNumber()
  eventId: number;

  @IsNumber()
  scheduleId: number;
}
