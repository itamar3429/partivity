import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ProvidersService } from './providers.service';
import { ProvidersController } from './providers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { entitiesArr } from '../../typeorm/index.entity';
import express from 'express';

@Module({
  providers: [ProvidersService],
  controllers: [ProvidersController],
  imports: [TypeOrmModule.forFeature(entitiesArr)],
})
export class ProvidersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    //  consumer
    //    .apply(
    //      (req, res, next) => {
    //        console.log('raw middleware');
    //        express.raw({
    //          limit: '5mb',
    //        })(req, res, next);
    //      },
    //      express.json({
    //        limit: '5mb',
    //      }),
    //      express.urlencoded({
    //        limit: '5mb',
    //      }),
    //    )
    //    .forRoutes({
    //      path: 'providers/service/image/*',
    //      method: RequestMethod.POST,
    //    });
  }
}
