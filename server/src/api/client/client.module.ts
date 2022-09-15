import { Module } from '@nestjs/common';
import { ClientService } from './client.service';
import { ClientController } from './client.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { entitiesArr } from '../../typeorm/index.entity';
import { EventsModule } from './events/events.module';

@Module({
  providers: [ClientService],
  controllers: [ClientController],
  imports: [TypeOrmModule.forFeature(entitiesArr), EventsModule],
})
export class ClientModule {}
