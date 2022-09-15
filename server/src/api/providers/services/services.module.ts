import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { entitiesArr } from '../../../typeorm/index.entity';
import { ServicesController } from './services.controller';
import { ServicesService } from './services.service';

@Module({
  controllers: [ServicesController],
  providers: [ServicesService],
  imports: [TypeOrmModule.forFeature(entitiesArr)],
})
export class ServicesModule {}
