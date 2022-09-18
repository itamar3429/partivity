import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { entitiesArr } from '../../typeorm/index.entity';
import { PublicController } from './public.controller';
import { PublicService } from './public.service';

@Module({
  controllers: [PublicController],
  providers: [PublicService],
  imports: [TypeOrmModule.forFeature(entitiesArr)],
})
export class PublicModule {}
