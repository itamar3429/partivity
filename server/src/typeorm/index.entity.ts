import { TypeOrmModule } from '@nestjs/typeorm';
import { mysqlConfig } from '../config';
import ServiceSchedule from './schedule.entity';
import ServiceImages from './images.entity';
import Events from './event.entity';
import Service from './services.entity';
import User from './users.entity';
import EventServices from './eventServices.entity';
import ServiceMenu from './serviceMenu.entity';

export const entitiesArr = [
  User,
  ServiceImages,
  ServiceSchedule,
  Events,
  Service,
  EventServices,
  ServiceMenu,
];

export const entitiesObj = {
  User,
  ServiceImages,
  ServiceSchedule,
  EventPlan: Events,
  Service,
  EventServices,
  ServiceMenu,
};

export const OrmForRoot = TypeOrmModule.forRoot({
  type: 'postgres',
  username: mysqlConfig.username,
  password: mysqlConfig.password,
  host: mysqlConfig.host,
  port: mysqlConfig.port,
  database: mysqlConfig.database,
  //   ssl: mysqlConfig.database,
  ssl: mysqlConfig.ssl,
  entities: entitiesArr,
  synchronize: true,
});

export const ormForFeatureAll = TypeOrmModule.forFeature(entitiesArr);

export default OrmForRoot;
