import {
  HttpException,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { MINIO_CONNECTION } from 'nestjs-minio';
import { Client } from 'minio';
import { MINIO_IMG_BUCKET } from './constants';

@Injectable()
export class MinioService {
  constructor(@Inject(MINIO_CONNECTION) private readonly storage: Client) {}

  async getObj(objName: string) {
    try {
      const object = await this.storage.getObject(MINIO_IMG_BUCKET, objName);
      return object;
    } catch (err) {
      return new NotFoundException('Object/File not found');
    }
  }

  async insertObj(objName: string, buffer: Buffer) {
    try {
      const object = await this.storage.putObject(
        MINIO_IMG_BUCKET,
        objName,
        buffer,
      );

      return object;
    } catch (err) {
      return new InternalServerErrorException('Failed to upload object/file');
    }
  }

  async addBucket() {
    const exists = await this.storage.bucketExists(MINIO_IMG_BUCKET);
    if (!exists) {
      this.storage.makeBucket(MINIO_IMG_BUCKET, 'us');
    }
  }
}
