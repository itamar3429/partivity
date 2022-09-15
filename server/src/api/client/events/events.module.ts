import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { entitiesArr } from '../../../typeorm/index.entity';

@Module({
  providers: [EventsService],
  controllers: [EventsController],
  imports: [TypeOrmModule.forFeature(entitiesArr)],
})
export class EventsModule {}
