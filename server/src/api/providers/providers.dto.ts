import { Injectable } from '@nestjs/common';
import {
  IsDate,
  IsDateString,
  IsEnum,
  IsNumber,
  IsString,
  Length,
  ValidateIf,
} from 'class-validator';
import { serviceEnum, TServices } from '../../typeorm/dto/Services.dto';

@Injectable()
export class addServiceDto {
  @IsEnum(serviceEnum)
  service: TServices;

  @ValidateIf((o: addServiceDto) => o.service === 'location')
  @IsNumber()
  capacity: number;

  @IsString()
  @Length(4)
  serviceType: string;

  @IsString()
  @Length(5)
  title: string;

  @IsString()
  @Length(15)
  description: string;

  @ValidateIf((o: addServiceDto) => o.service === 'location')
  @IsString()
  country: string;

  @ValidateIf((o: addServiceDto) => o.service === 'location')
  @IsString()
  city: string;

  @ValidateIf((o: addServiceDto) => o.service === 'location')
  @IsString()
  address: string;

  //   @ValidateIf((o: addServiceDto) => !!o.service.match(/food|music/))
  @IsString()
  name: string;
}

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
  serviceId: number;

  @IsString()
  title: string;

  @IsNumber()
  price: number;
}
