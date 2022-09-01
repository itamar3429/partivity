import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import OrmForRoot from './typeorm/index.entity';
@Module({
  imports: [OrmForRoot],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
