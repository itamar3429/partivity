import { TypeOrmModule } from '@nestjs/typeorm';
import { mysqlConfig } from '../config';
import ServiceSchedule from './schedule.entity';
import ServiceImages from './images.entity';
import PartyPlan from './party.entity';
import Service from './services.entity';
import User from './users.entity';

export const entitiesArr = [
  User,
  ServiceImages,
  ServiceSchedule,
  PartyPlan,
  Service,
];

export const entitiesObj = {
  User,
  ServiceImages,
  ServiceSchedule,
  PartyPlan,
  Service,
};

export const OrmForRoot = TypeOrmModule.forRoot({
  type: 'mysql',
  username: mysqlConfig.username,
  password: mysqlConfig.password,
  host: mysqlConfig.host,
  port: mysqlConfig.port,
  database: mysqlConfig.database,
  //   ssl: mysqlConfig.database,
  ssl: {
    rejectUnauthorized: false,
  },
  entities: entitiesArr,
  synchronize: true,
});

export const ormForFeatureAll = TypeOrmModule.forFeature(entitiesArr);

export default OrmForRoot;
