import {
  Inject,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import ServiceImages from '../../typeorm/images.entity';
import { Repository } from 'typeorm';
import Service from '../../typeorm/services.entity';
import { MINIO_CONNECTION } from 'nestjs-minio';
import { Client } from 'minio';
import { MINIO_IMG_BUCKET } from '../../minio/constants';
import { v4 as uuidV4 } from 'uuid';

const N_IMAGES = ServiceImages.getName();
const N_SERVICES = Service.getName();

@Injectable()
export class ProvidersService {
  constructor(
    @InjectRepository(ServiceImages)
    private readonly serviceImages: Repository<ServiceImages>,
    @InjectRepository(Service)
    private readonly serviceRepo: Repository<Service>,
    @Inject(MINIO_CONNECTION) private readonly storage: Client,
  ) {}

  async isFirstImage(serviceId: number) {
    return !(await this.serviceImages.findOne({
      where: { service_id: serviceId },
    }));
  }

  async addImage(userId: number, serviceId: number, file: Express.Multer.File) {
    const isOwner = await this.isServiceOwner(userId, serviceId);
    if (isOwner) {
      const dbRes = await this.addImageToDB(
        userId,
        serviceId,
        file.originalname,
        this.getExtension(file.originalname),
      );
      if (!(dbRes instanceof InternalServerErrorException)) {
        const storageRes = await this.insertObj(dbRes.uuid, file.buffer);
        if (!(storageRes instanceof InternalServerErrorException)) {
          return {
            success: true,
            message: 'file uploaded successfully',
            objId: dbRes.uuid,
            imageId: dbRes.imageId,
            primary: dbRes.primary,
          };
        } else {
          return storageRes;
        }
      } else {
        return dbRes;
      }
    } else {
      return new UnauthorizedException('user not allowed to post this image');
    }
  }

  async getServiceImages(userId: number, serviceId: number) {
    const isOwner = await this.isServiceOwner(userId, serviceId);
    if (isOwner) {
      const res = await this.serviceImages.find({
        where: { service_id: serviceId, user_id: userId },
        select: {
          obj_id: true,
          id: true,
          primary: true,
        },
        order: {
          primary: 'DESC',
        },
      });

      return { success: true, images: res };
    } else {
      return new UnauthorizedException(
        'user cannot access this service images',
      );
    }
  }

  async changePrimaryImage(userId: number, imageId: number, serviceId: number) {
    const isOwner = await this.isServiceOwner(userId, serviceId);
    if (isOwner) {
      const res = await this.serviceImages.query(
        `
			UPDATE ${N_IMAGES} set 
			${N_IMAGES}.primary = (${N_IMAGES}.id = ?) 
			WHERE ${N_IMAGES}.service_id = ?
				AND ${N_IMAGES}.USER_id = ?`,
        [imageId, serviceId, userId],
      );

      return { success: !!res.changedRows };
    } else {
      return new UnauthorizedException('user not allowed');
    }
  }

  async deleteImage(imageId: number, userId: number, isAdmin: boolean) {
    const isOwner = await this.isImageOwner(userId, imageId);

    if (isOwner || isAdmin) {
      const remove = await this.serviceImages.findOne({
        where: { id: imageId },
      });
      const objName = remove.obj_id;
      const deletedDB = await this.serviceImages.delete(remove);

      if (remove.primary) {
        await this.serviceImages.query(
          `
				UPDATE ${N_IMAGES} set ${N_IMAGES}.primary = ?
				WHERE service_id = ? 
				limit 1
			`,
          [true, remove.service_id],
        );
      }

      if (deletedDB.affected) {
        this.storage.removeObject(MINIO_IMG_BUCKET, objName).catch();
      }

      return {
        success: true,
        deletedId: imageId,
        message: 'deleted successfully',
      };
    } else {
      return new UnauthorizedException('user not allowed to delete this image');
    }
  }

  private async addImageToDB(
    userId: number,
    serviceId: number,
    filename: string,
    ext: string,
  ) {
    try {
      const uuid = this.genObjId();
      const imageInstance = this.serviceImages.create({
        image: filename,
        service_id: serviceId,
        obj_id: uuid,
        file_ext: ext,
        primary: await this.isFirstImage(serviceId),
        user_id: userId,
      });
      const res = await this.serviceImages.save(imageInstance);

      return {
        success: true,
        uuid,
        imageData: res,
        imageId: res.id,
        primary: res.primary,
      };
    } catch (error) {
      return new InternalServerErrorException(
        'Failed to save image to database',
      );
    }
  }

  private async insertObj(objName: string, bufferArr: Uint8Array) {
    try {
      const object = await this.storage.putObject(
        MINIO_IMG_BUCKET,
        objName,
        Buffer.from(bufferArr),
      );

      return object;
    } catch (err) {
      await this.removeImgByObjId(objName);

      return new InternalServerErrorException(
        'Failed to upload object to storage',
      );
    }
  }

  private genObjId() {
    return uuidV4();
  }

  private getExtension(filename: string): string {
    filename = filename.toLowerCase();
    const extensionRegExp = /(?:\.([^.]+))?$/;
    //  eslint-disable-next-line @typescript-eslint/no-non-null-assertion
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

  private async isServiceOwner(userId: number, serviceId: number) {
    return !!(await this.serviceRepo.findOne({
      where: { user_id: userId, id: serviceId },
    }));
  }

  private async isImageOwner(userId: number, imageId: number) {
    return !!(await this.serviceImages.findOne({
      where: { user_id: userId, id: imageId },
    }));
  }

  private async removeImgByObjId(objId: string) {
    await this.serviceImages.delete({ obj_id: objId });
  }
}
