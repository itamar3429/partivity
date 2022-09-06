import { Module } from '@nestjs/common';
import { ProvidersService } from './providers.service';
import { ProvidersController } from './providers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { entitiesArr } from '../../typeorm/index.entity';

@Module({
  providers: [ProvidersService],
  controllers: [ProvidersController],
  imports: [TypeOrmModule.forFeature(entitiesArr)],
})
export class ProvidersModule {}
