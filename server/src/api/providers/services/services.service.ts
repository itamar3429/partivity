import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Client } from 'minio';
import { MINIO_CONNECTION } from 'nestjs-minio';
import ServiceImages from '../../../typeorm/images.entity';
import Service from '../../../typeorm/services.entity';
import { Repository } from 'typeorm';
import { addServiceDto } from './service.dto';

const N_IMAGES = ServiceImages.getName();
const N_SERVICES = Service.getName();

@Injectable()
export class ServicesService {
  constructor(
    @InjectRepository(ServiceImages)
    private readonly serviceImages: Repository<ServiceImages>,
    @InjectRepository(Service)
    private readonly serviceRepo: Repository<Service>,
    @Inject(MINIO_CONNECTION) private readonly storage: Client,
  ) {}

  async isServiceOwner(userId: number, serviceId: number) {
    return !!(await this.serviceRepo.findBy({ user_id: userId, id: serviceId }))
      .length;
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

    return { success: true, services };
  }

  async getService(userId: number, serviceId: number) {
    const service = await this.serviceRepo.query(
      `SELECT ${N_SERVICES}.*, JSON_ARRAYAGG(obj_id) AS images FROM ${N_SERVICES} 
			LEFT JOIN ${N_IMAGES} ON service_id = ${N_SERVICES}.id
			WHERE user_id = ?
				AND ${N_SERVICES}.id = ?
			GROUP BY ${N_SERVICES}.id`,
      [userId, serviceId],
    );
    if (service.length) {
      return { success: true, service: service[0] };
    } else {
      return { success: false, message: 'service not found' };
    }
  }

  async addService(data: addServiceDto, userId: number) {
    const service = this.serviceRepo.create({ ...data, user_id: userId });
    const res = await this.serviceRepo.save(service);
    if (res) return { service: res, success: true };
    else
      return {
        success: false,
        message: 'failed to save and retrieve the service',
      };
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
    if (res.affected)
      return { success: true, message: 'service updated successfully' };
    else return { success: false, message: "service can't be updated" };
  }

  async deleteService(serviceId: number, userId: number) {
    const res = await this.serviceRepo.update(
      { user_id: userId, id: serviceId },
      { deleted: true },
    );
    const success = !!res.affected;
    return {
      success: success,
      message: success
        ? 'deleted successfully'
        : "could'nt deleted the service",
    };
  }
}
