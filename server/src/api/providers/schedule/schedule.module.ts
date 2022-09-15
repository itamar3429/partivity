import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { entitiesArr } from '../../../typeorm/index.entity';
import { ScheduleController } from './schedule.controller';
import { ScheduleService } from './schedule.service';

@Module({
  controllers: [ScheduleController],
  providers: [ScheduleService],
  imports: [TypeOrmModule.forFeature(entitiesArr)],
})
export class ScheduleModule {}
