import {
  ForbiddenException,
  HttpException,
  Inject,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import ServiceAvailability from '../../typeorm/availability.entity';
import ServiceImages from '../../typeorm/images.entity';
import { Repository } from 'typeorm';
import { addServiceDto } from './providers.dto';
import Service from '../../typeorm/services.entity';
import { MINIO_CONNECTION } from 'nestjs-minio';
import { Client } from 'minio';
import { MINIO_IMG_BUCKET } from '../../minio/constants';
import { v4 as uuidV4 } from 'uuid';
@Injectable()
export class ProvidersService {
  constructor(
    @InjectRepository(ServiceImages)
    private readonly serviceImages: Repository<ServiceImages>,
    @InjectRepository(ServiceAvailability)
    private readonly serviceAvailability: Repository<ServiceAvailability>,
    @InjectRepository(Service)
    private readonly serviceRepo: Repository<Service>,
    @Inject(MINIO_CONNECTION) private readonly storage: Client,
  ) {}

  async addService(data: addServiceDto, userId: number) {
    const service = this.serviceRepo.create({ ...data, userId });
    return this.serviceRepo.save(service);
  }

  async getServices(userId: number) {
    const services = await this.serviceRepo.query(
      `SELECT services.*, JSON_ARRAYAGG(obj_id) AS images FROM services 
		LEFT JOIN service_images ON service_id = services.id
		WHERE user_id = ?
		GROUP BY services.id`,
      [userId],
    );

    return services;
  }

  async getServiceImages(serviceId: number) {
    try {
      return await this.serviceImages.find({
        where: { serviceId },
        select: {
          objId: true,
          id: true,
        },
      });
    } catch (err) {
      throw new HttpException(err, 500);
    }
  }

  async addImageToDB(filename: string, serviceId: number, ext: string) {
    try {
      const uuid = this.genObjId();
      const imageInstance = this.serviceImages.create({
        image: filename,
        serviceId,
        objId: uuid,
        fileExt: ext,
      });
      const res = await this.serviceImages.save(imageInstance);
      return { success: true, uuid, imageData: res, imageId: res.id };
    } catch (err) {
      throw new HttpException('failed when trying to save image to db', 500);
    }
  }

  async removeImgByObjId(objId: string) {
    await this.serviceImages.delete({ objId });
  }

  async insertObj(objName: string, bufferArr: Uint8Array) {
    try {
      const object = await this.storage.putObject(
        MINIO_IMG_BUCKET,
        objName,
        Buffer.from(bufferArr),
      );

      return object;
    } catch (err) {
      console.error(err);
      await this.removeImgByObjId(objName);
      throw new HttpException(
        {
          message: 'failed to upload object: ' + (err?.code || ''),
          success: false,
        },
        500,
      );
    }
  }

  genObjId() {
    return uuidV4();
  }

  getExtension(filename: string): string {
    filename = filename.toLowerCase();
    const extensionRegExp = /(?:\.([^.]+))?$/;
    const extension: string = extensionRegExp.exec(filename)![1];
    if (extension) {
      return extension;
    } else {
      if (filename !== '') {
        return filename;
      } else {
        return '';
      }
    }
  }

  async deleteImage(imageId: number, userId: number, isAdmin: boolean) {
    const AuthenticateUser = (await this.serviceImages.query(
      `
	 SELECT * FROM service_images 
	 LEFT JOIN services on services.id = service_id
	 WHERE user_id = ? AND service_images.id = ?
	 `,
      [userId, imageId],
    )) as any[];
    try {
      if (AuthenticateUser.length || isAdmin) {
        const objName = AuthenticateUser[0].obj_id;
        const deletedDB = await this.serviceImages.delete({ id: imageId });

        if (deletedDB.affected) {
          const deletedStorage = await this.storage.removeObject(
            MINIO_IMG_BUCKET,
            objName,
          );
        }
        return {
          success: true,
          deletedId: imageId,
          message: 'deleted successfully',
        };
      }
      throw new ForbiddenException();
    } catch (err) {
      throw new HttpException(
        {
          success: false,
          message: 'error while trying to delete image: ' + err?.code,
        },
        500,
      );
    }
  }
}
