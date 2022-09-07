import { Module } from '@nestjs/common';
import { MinioService } from './minio.service';
import { MinioController } from './minio.controller';
import { NestMinioModule } from 'nestjs-minio';
import { minioConfig } from '../config';

@Module({
  providers: [MinioService],
  controllers: [MinioController],
  imports: [
    NestMinioModule.register({
      endPoint: minioConfig.host,
      port: Number(minioConfig.port),
      useSSL: minioConfig.ssl,
      accessKey: minioConfig.accessKey,
      secretKey: minioConfig.secretKey,
    }),
  ],
})
export class MinioModule {}
