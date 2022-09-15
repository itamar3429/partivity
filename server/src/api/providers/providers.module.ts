import { Module } from '@nestjs/common';
import { ProvidersService } from './providers.service';
import { ProvidersController } from './providers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { entitiesArr } from '../../typeorm/index.entity';
import { ScheduleModule } from './schedule/schedule.module';
import { ServicesModule } from './services/services.module';

@Module({
  providers: [ProvidersService],
  controllers: [ProvidersController],
  imports: [TypeOrmModule.forFeature(entitiesArr), ScheduleModule, ServicesModule],
})
export class ProvidersModule {}
