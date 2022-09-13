import {
  ForbiddenException,
  HttpException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import ServiceSchedule from '../../typeorm/schedule.entity';
import ServiceImages from '../../typeorm/images.entity';
import { Repository } from 'typeorm';
import {
  AddScheduleDto,
  addServiceDto,
  EditScheduleDto,
} from './providers.dto';
import Service from '../../typeorm/services.entity';
import { MINIO_CONNECTION } from 'nestjs-minio';
import { Client } from 'minio';
import { MINIO_IMG_BUCKET } from '../../minio/constants';
import { v4 as uuidV4 } from 'uuid';

const N_IMAGES = ServiceImages.getName();
const N_SERVICES = Service.getName();
const N_SCHEDULE = ServiceSchedule.getName();

@Injectable()
export class ProvidersService {
  constructor(
    @InjectRepository(ServiceImages)
    private readonly serviceImages: Repository<ServiceImages>,
    @InjectRepository(ServiceSchedule)
    private readonly serviceSchedule: Repository<ServiceSchedule>,
    @InjectRepository(Service)
    private readonly serviceRepo: Repository<Service>,
    @Inject(MINIO_CONNECTION) private readonly storage: Client,
  ) {}

  async isScheduleOwner(userId: number, serviceId: number) {
    return !!(await this.serviceRepo.findBy({ user_id: userId, id: serviceId }))
      .length;
  }

  async addService(data: addServiceDto, userId: number) {
    const service = this.serviceRepo.create({ ...data, user_id: userId });
    return this.serviceRepo.save(service);
  }

  async addImageToDB(filename: string, serviceId: number, ext: string) {
    try {
      const uuid = this.genObjId();
      const imageInstance = this.serviceImages.create({
        image: filename,
        service_id: serviceId,
        objId: uuid,
        file_ext: ext,
      });
      const res = await this.serviceImages.save(imageInstance);
      return { success: true, uuid, imageData: res, imageId: res.id };
    } catch (err) {
      throw new HttpException('failed when trying to save image to db', 500);
    }
  }

  async getServices(userId: number) {
    const services = await this.serviceRepo.query(
      `SELECT ${N_SERVICES}.*, JSON_ARRAYAGG(obj_id) AS images FROM ${N_SERVICES} 
	  LEFT JOIN ${N_IMAGES} ON service_id = ${N_SERVICES}.id
	  WHERE user_id = ?
	  AND deleted = false
	  GROUP BY ${N_SERVICES}.id`,
      [userId],
    );

    return services;
  }

  async getService(userId: number, serviceId: number) {
    const service = await this.serviceRepo.query(
      `SELECT * FROM ${N_SERVICES} 
	  WHERE user_id = ?
	  AND id = ?
	  GROUP BY ${N_SERVICES}.id`,
      [userId, serviceId],
    );

    return service[0];
  }

  async getServiceImages(serviceId: number) {
    try {
      return await this.serviceImages.find({
        where: { service_id: serviceId },
        select: {
          objId: true,
          id: true,
        },
      });
    } catch (err) {
      throw new HttpException(err, 500);
    }
  }

  async removeImgByObjId(objId: string) {
    await this.serviceImages.delete({ objId });
  }

  async deleteService(serviceId: number, userId: number) {
    const res = await this.serviceRepo.update(
      { user_id: userId, id: serviceId },
      { deleted: true },
    );
    return { success: !!res.affected };
  }

  async deleteImage(imageId: number, userId: number, isAdmin: boolean) {
    const AuthenticateUser = (await this.serviceImages.query(
      `
	 SELECT * FROM ${N_IMAGES} 
	 LEFT JOIN ${N_SERVICES} on ${N_SERVICES}.id = service_id
	 WHERE user_id = ? AND ${N_IMAGES}.id = ?
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

  async updateService(
    userId: number,
    serviceId: number,
    service: addServiceDto,
  ) {
    delete service.service;
    const res = await this.serviceRepo.update(
      { id: serviceId, user_id: userId },
      { ...service },
    );
    return res;
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

  async getSchedule(userId: number, serviceId: number) {
    const res = await this.serviceSchedule.query(
      ` SELECT ${N_SCHEDULE}.* FROM ${N_SCHEDULE}
	 	INNER JOIN ${N_SERVICES} on ${N_SERVICES}.id = service_id 
	 	WHERE service_id = ? AND user_id = ?
	 	`,
      [serviceId, userId],
    );

    return { success: true, schedules: res };
  }

  async addSchedules(
    userId: number,
    serviceId: number,
    schedules: AddScheduleDto[],
  ) {
    if (await this.isScheduleOwner(userId, serviceId)) {
      const res = await this.serviceSchedule.save(schedules);
      return { success: true, schedule: res };
    }
    return { success: false };
  }

  async updateSchedule(userId: number, id: number, schedule: EditScheduleDto) {
    const serviceId = schedule.service_id;

    if (await this.isScheduleOwner(userId, serviceId)) {
      const res = await this.serviceSchedule.update(
        {
          service_id: serviceId,
          id,
        },
        schedule,
      );

      return { success: !!res.affected };
    } else throw new UnauthorizedException(undefined, 'unauthorized access');
  }

  async deleteSchedule(userId: number, id: number) {
    const isOwner = !!(
      await this.serviceSchedule.query(
        `select count(*) as count from ${N_SCHEDULE} 
	inner join ${N_SERVICES} on ${N_SERVICES}.id = service_id
	where user_id = ? and ${N_SCHEDULE}.id = ?`,
        [userId, id],
      )
    )[0].count;
    if (isOwner) {
      const res = await this.serviceSchedule.delete({ id });

      return { success: !!res.affected };
    }
    return { success: false };
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
}
