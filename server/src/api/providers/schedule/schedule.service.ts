import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import ServiceSchedule from '../../../typeorm/schedule.entity';
import Service from '../../../typeorm/services.entity';
import { Repository } from 'typeorm';
import { AddScheduleDto, EditScheduleDto } from './schedule.dto';

const N_SERVICES = Service.getName();
const N_SCHEDULE = ServiceSchedule.getName();

@Injectable()
export class ScheduleService {
  constructor(
    @InjectRepository(ServiceSchedule)
    private readonly serviceSchedule: Repository<ServiceSchedule>,
    @InjectRepository(Service)
    private readonly serviceRepo: Repository<Service>,
  ) {}

  async isServiceOwner(userId: number, serviceId: number) {
    return !!(await this.serviceRepo.findBy({ user_id: userId, id: serviceId }))
      .length;
  }

  private async isScheduleOwner(userId: number, id: number) {
    const isOwner = !!(
      await this.serviceSchedule.query(
        `select count(*) as count from ${N_SCHEDULE} 
 		 	inner join ${N_SERVICES} on ${N_SERVICES}.id = service_id
  			where user_id = ? and ${N_SCHEDULE}.id = ?`,
        [userId, id],
      )
    )[0].count;
    return isOwner;
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
    const isOwner = await this.isServiceOwner(userId, serviceId);
    if (isOwner) {
      const res = await this.serviceSchedule.save(schedules);
      return { success: true, schedule: res };
    } else
      return new UnauthorizedException(
        'user not authorized to add schedule for this service',
      );
  }

  async updateSchedule(userId: number, id: number, schedule: EditScheduleDto) {
    const serviceId = schedule.service_id;

    if (await this.isServiceOwner(userId, serviceId)) {
      const res = await this.serviceSchedule.update(
        {
          service_id: serviceId,
          id,
        },
        schedule,
      );

      return { success: !!res.affected };
    } else {
      return new UnauthorizedException(
        'user not authorized to update this schedule',
      );
    }
  }

  async deleteSchedule(userId: number, id: number) {
    const isOwner = await this.isScheduleOwner(userId, id);
    if (isOwner) {
      const res = await this.serviceSchedule.delete({ id, booked: false });

      const success = !!res.affected;
      return {
        success,
        message: success
          ? 'deleted successfully'
          : "schedule is booked and couldn't be deleted",
      };
    } else {
      return new UnauthorizedException(
        'user not authorized to delete this schedule',
      );
    }
  }
}
