import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import ServiceSchedule from '../../../typeorm/schedule.entity';
import Service from '../../../typeorm/services.entity';
import { Between, Repository } from 'typeorm';
import { AddScheduleDto, EditScheduleDto } from './schedule.dto';
import Event from '../../../typeorm/event.entity';
import EventServices from '../../../typeorm/eventServices.entity';

const N_SERVICES = Service.getName();
const N_SCHEDULE = ServiceSchedule.getName();
const N_EVENTS = Event.getName();
const N_EVENT_S = EventServices.getName();

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
    const isOwner = !!(await this.serviceSchedule.findOne({
      where: { user_id: userId, id },
    }));
    return isOwner;
  }

  async getSchedule(userId: number, serviceId: number) {
    const res = await this.serviceSchedule.find({
      where: {
        service_id: serviceId,
        user_id: userId,
      },
    });

    return { success: true, schedules: res };
  }

  async addSchedules(
    userId: number,
    serviceId: number,
    schedules: AddScheduleDto[],
  ) {
    const isOwner = await this.isServiceOwner(userId, serviceId);
    if (isOwner) {
      const res = await this.serviceSchedule.save(
        schedules.map((schedule: ServiceSchedule) => ({
          ...schedule,
          user_id: userId,
          service_id: serviceId,
          booked: false,
        })),
      );
      return { success: true, schedule: res };
    } else
      return new UnauthorizedException(
        'user not authorized to add schedule for this service',
      );
  }

  async updateSchedule(userId: number, id: number, schedule: EditScheduleDto) {
    const serviceId = schedule.service_id;

    const isOwner = await this.isServiceOwner(userId, serviceId);
    if (isOwner) {
      const res = await this.serviceSchedule.update(
        {
          service_id: serviceId,
          id,
          user_id: userId,
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
      const res = await this.serviceSchedule.delete({
        id,
        booked: false,
        user_id: userId,
      });

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

  async getUpcomingEvents(userId: number) {
    const res = await this.serviceSchedule
      .createQueryBuilder(N_SCHEDULE)
      .select([
        `${N_SCHEDULE}.*`,
        `${N_SCHEDULE}.id as schedule_id`,
        `${N_SCHEDULE}.title as schedule_title`,
        `${N_SERVICES}.*`,
        `${N_SERVICES}.id as service_id`,
        `${N_SERVICES}.title as service_title`,
        `${N_EVENTS}.name as event_name`,
        `${N_EVENTS}.title as event_title`,
        `${N_EVENTS}.description as event_description`,
        `${N_EVENTS}.id as event_id`,
      ])
      .innerJoin(
        Service,
        N_SERVICES,
        `${N_SERVICES}.id = ${N_SCHEDULE}.service_id`,
      )
      .innerJoin(
        EventServices,
        N_EVENT_S,
        `${N_EVENT_S}.schedule_id = ${N_SCHEDULE}.id`,
      )
      .innerJoin(Event, N_EVENTS, `${N_EVENTS}.id = ${N_EVENT_S}.event_id`)
      .where({
        user_id: userId,
        booked: true,
        start: Between(
          new Date(),
          new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
        ),
      })
      .getRawMany();

    return {
      success: true,
      events: res,
    };
  }
}
