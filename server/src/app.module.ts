import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ApiModule } from './api/api.module';
import OrmForRoot from './typeorm/index.entity';
import { MinioModule } from './minio/minio.module';
@Module({
  imports: [OrmForRoot, UsersModule, AuthModule, ApiModule, MinioModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
