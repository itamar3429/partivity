import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Events from '../../typeorm/event.entity';
import { In, Repository, MoreThan, LessThan } from 'typeorm';
import EventServices from '../../typeorm/eventServices.entity';
import Event from '../../typeorm/event.entity';
import { AddEventDto, addEventServiceDto } from './client.dto';
import ServiceSchedule from '../../typeorm/schedule.entity';
import Service from '../../typeorm/services.entity';
import ServiceImages from '../../typeorm/images.entity';

const N_EVENTS = Events.getName();
const N_EVENT_S = EventServices.getName();
const N_SCHEDULE = ServiceSchedule.getName();
const N_SERVICES = Service.getName();
const N_IMAGES = ServiceImages.getName();

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(Events)
    private readonly events: Repository<Events>,
    @InjectRepository(EventServices)
    private readonly eventServices: Repository<EventServices>,
    @InjectRepository(Service)
    private readonly services: Repository<Service>,
    @InjectRepository(ServiceSchedule)
    private readonly schedule: Repository<ServiceSchedule>,
  ) {}

  async isEventOwner(userId: number, eventId: number) {
    return !!(await this.events.findOne({
      where: { id: eventId, user_id: userId },
    }));
  }

  async isEventServiceOwner(userId: number, eventServiceId: number) {
    return !!(
      await this.eventServices.query(
        `SELECT COUNT(*) as count FROM ${N_EVENT_S}
	 INNER JOIN ${N_EVENTS} ON  ${N_EVENTS}.id = ${N_EVENT_S}.event_id
	 WHERE ${N_EVENT_S}.id = ? AND ${N_EVENTS}.user_id = ?
	 `,
        [eventServiceId, userId],
      )
    )[0].count;
  }

  async getEventServices(eventIds: number[], userId: number) {
    const res = await this.eventServices
      .createQueryBuilder(N_EVENT_S)
      .select([
        `${N_EVENT_S}.*`,
        `${N_EVENT_S}.id AS event_service_id`,
        `${N_SCHEDULE}.*`,
        `${N_SCHEDULE}.title AS schedule_title`,
        `${N_SERVICES}.*`,
        `${N_SERVICES}.title AS service_title`,
        `JSON_ARRAYAGG(obj_id) AS images`,
      ])
      .leftJoin(
        ServiceSchedule,
        N_SCHEDULE,
        `${N_SCHEDULE}.id = ${N_EVENT_S}.schedule_id`,
      )
      .leftJoin(
        Service,
        N_SERVICES,
        `${N_SERVICES}.id = ${N_SCHEDULE}.service_id`,
      )
      .leftJoin(
        ServiceImages,
        N_IMAGES,
        `${N_SERVICES}.id = ${N_IMAGES}.service_id`,
      )
      .where({
        event_id: In(eventIds),
        user_id: userId,
      })
      .groupBy(`${N_EVENT_S}.id`)
      .getRawMany();

    return res;
  }

  async getServiceOptions(date: Date) {
    let start = new Date(new Date(date).toISOString().split('T')[0]);
    let end = new Date(new Date(date).toISOString().split('T')[0]);
    //  end.setDate(end.getDate() + 1);
    const now = new Date(new Date().toISOString().split('T')[0]);

    if (start.getTime() < now.getTime()) {
      start = now;
      end = new Date(now);
    }
    end.setHours(end.getHours() + 12 * 3);
    start.setHours(start.getHours() - 12 * 2);

    const res = await this.schedule
      .createQueryBuilder(N_SCHEDULE)
      .select([
        `${N_SCHEDULE}.*`,
        `${N_SCHEDULE}.title as schedule_title`,
        `${N_SCHEDULE}.id as schedule_id`,
        `${N_SERVICES}.*`,
        `${N_SERVICES}.title as service_title`,
        `${N_IMAGES}.obj_id as image`,
      ])
      .innerJoin(
        Service,
        N_SERVICES,
        `${N_SCHEDULE}.service_id = ${N_SERVICES}.id AND ${N_SERVICES}.deleted = FALSE`,
      )
      .leftJoin(
        ServiceImages,
        N_IMAGES,
        `${N_IMAGES}.service_id = ${N_SERVICES}.id AND ${N_IMAGES}.primary = TRUE`,
      )
      .where({
        start: MoreThan(start.toISOString()),
        end: LessThan(end.toISOString()),
        booked: false,
      })
      .getRawMany();
    return { success: true, services: res };
  }

  async getDates() {
    const res = await this.schedule.query(
      `
		SELECT JSON_ARRAYAGG(start) as dates from 
			(
				select distinct DATE_FORMAT(start, '%Y-%c-%d') 
				as start from ${N_SCHEDULE} 
				INNER JOIN ${N_SERVICES} ON ${N_SERVICES}.id = ${N_SCHEDULE}.service_id
				where start > ? 
					AND booked = FALSE
					AND ${N_SERVICES}.deleted = FALSE
			)
			${N_SCHEDULE}_temp
		`,
      [new Date()],
    );

    const dates = res[0].dates;
    return { success: true, dates: dates || [] };
  }

  async addEventService(userId: number, eventService: addEventServiceDto) {
    const isOwner = await this.isEventOwner(userId, eventService.eventId);
    if (isOwner) {
      await this.eventServices.save({
        event_id: eventService.eventId,
        schedule_id: eventService.scheduleId,
        user_id: userId,
      });
      const res = await this.getEventServices([eventService.eventId], userId);
      return { success: true, services: res };
    } else {
      return new UnauthorizedException('user not allowed to change this event');
    }
  }

  async deleteEventService(userId: number, eventServiceId: number) {
    const isOwner = await this.isEventServiceOwner(userId, eventServiceId);

    if (isOwner) {
      const res = await this.eventServices.delete({
        id: eventServiceId,
        user_id: userId,
      });
      const success = !!res.affected;
      return {
        success: success,
        message: success
          ? 'Event service deleted successfully'
          : 'Failed to delete event service',
      };
    } else {
      return new UnauthorizedException(
        'user unauthorized to perform this action',
      );
    }
  }

  async setBooked(scheduleIds: number[]) {
    return await this.schedule.update(
      { id: In(scheduleIds) },
      {
        booked: true,
      },
    );
  }

  async bookEvent(userId: number, eventId: number) {
    const isOwner = await this.isEventOwner(userId, eventId);
    if (isOwner) {
      const { eventServices, booked } = await this.checkEventServicesNotBooked(
        eventId,
      );
      if (!booked) {
        await this.setBooked(
          eventServices.map((schedule) => schedule.schedule_id),
        );
        this.events.update(
          { id: eventId, user_id: userId },
          {
            status: 'booked',
          },
        );
        return { success: true };
      } else {
        return {
          success: false,
          message: 'some of the services are booked',
          bookedServices: eventServices.filter((row) => row.booked),
        };
      }
    } else {
      return new UnauthorizedException('user unauthorized');
    }
  }

  private async checkEventServicesNotBooked(eventId: number) {
    const res = await this.eventServices
      .createQueryBuilder(N_EVENT_S)
      .select([
        `${N_EVENT_S}.*`,
        `${N_EVENT_S}.id AS event_service_id`,
        `${N_SCHEDULE}.*`,
        `${N_SCHEDULE}.title AS schedule_title`,
      ])
      .leftJoin(
        ServiceSchedule,
        N_SCHEDULE,
        `${N_SCHEDULE}.id = ${N_EVENT_S}.schedule_id
		  AND ${N_SCHEDULE}.booked = false`,
      )
      .where({
        event_id: eventId,
      })
      .getRawMany();
    const isBooked = res.some((row) => row.schedule_title === null);
    const eventServices = res.map((row) => {
      row.booked = row.schedule_title === null;
      return row;
    });
    return { booked: isBooked, eventServices: eventServices };
  }
}
