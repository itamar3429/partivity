import { TypeOrmModule } from '@nestjs/typeorm';
import { mysqlConfig } from '../config';
import ServiceAvailability from './availability.entity';
import ServiceImages from './images.entity';
import PartyPlan from './party.entity';
import Service from './services.entity';
import User from './users.entity';

export const entitiesArr = [
  User,
  ServiceImages,
  ServiceAvailability,
  PartyPlan,
  Service,
];

export const entitiesObj = {
  User,
  ServiceImages,
  ServiceAvailability,
  PartyPlan,
  Service,
};
console.log(mysqlConfig);

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
