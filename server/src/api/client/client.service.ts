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

  async getEventsByUser(userId: number) {
    const events = await this.events.findBy({ user_id: userId });
    if (events.length) {
      const eventIds = events.map((e) => e.id);

      const services = await this.getEventServices(eventIds);
      //  await this.eventServices.find({
      //   where: {
      //     event_id: In(events.map((e) => e.id)),
      //   },
      // });

      const res = (events as (Event & { services: EventServices[] })[]).map(
        (e) => {
          e.services = services.filter((s) => (s.event_id = e.id));

          return e;
        },
      );

      return res;
    }
    return [];
  }

  async getEvent(userId: number, eventId: number) {
    const event = await this.events.findOne({
      where: {
        id: eventId,
        user_id: userId,
      },
    });

    if (event) {
      const services = await this.getEventServices([event.id]);

      return { ...event, services };
    } else throw new UnauthorizedException();
  }

  //   async getEventServices(eventIds: number[]) {
  //     const res = await this.eventServices.find({
  //       where: {
  //         event_id: In(eventIds),
  //       },
  //       relations: {
  //         schedule_id: true,
  //       },
  //     });

  //     return res;
  //   }

  async getEventServices(eventIds: number[]) {
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
      })
      .groupBy(`${N_EVENT_S}.id, ${N_SERVICES}.id`)
      .getRawMany();

    return res;
  }

  async addEvent(userId: number, event: AddEventDto) {
    const res = await this.events.save({
      description: event.description,
      name: event.name,
      status: 'pending',
      title: event.title,
      user_id: userId,
      date: new Date(event.date),
    });
    delete res.user_id;
    return { success: true, event: res };
  }

  async updateEvent(userId: number, eventId: number, event: AddEventDto) {
    const res = await this.events.update(
      {
        user_id: userId,
        id: eventId,
      },
      {
        description: event.description,
        name: event.name,
        status: 'pending',
        title: event.title,
        user_id: userId,
        date: new Date(event.date),
      },
    );
    return { success: !!res.affected };
  }

  async getEventsByUserOld(userId: number) {
    return this.events.query(
      `
	SELECT ${N_EVENTS}.*, 
	JSON_ARRAYAGG(JSON_OBJECT(
	  'id', ${N_EVENT_S}.id,
	  'event_id',${N_EVENT_S}.event_id,
	  'service_id',${N_EVENT_S}.service_id
	  )) as event_services
	 from ${N_EVENTS} 
	LEFT JOIN ${N_EVENT_S} ON event_id = ${N_EVENTS}.id
	WHERE user_id = ?
	GROUP BY ${N_EVENTS}.id
	`,
      [userId],
    );
  }

  async getEventOld(userId: number, eventId: number) {
    return this.events.query(
      `
		SELECT ${N_EVENTS}.*, 
		JSON_ARRAYAGG(JSON_OBJECT(
		  'id', ${N_EVENT_S}.id,
		  'event_id',${N_EVENT_S}.event_id,
		  'service_id',${N_EVENT_S}.service_id
		  )) as event_services
		 from ${N_EVENTS} 
		LEFT JOIN ${N_EVENT_S} ON event_id = ${N_EVENTS}.id
		WHERE user_id = ?
		AND ${N_EVENTS}.id = ?
		GROUP BY ${N_EVENTS}.id
	 `,
      [userId, eventId],
    );
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
      .leftJoin(
        Service,
        N_SERVICES,
        `${N_SCHEDULE}.service_id = ${N_SERVICES}.id`,
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
    const dates = await this.schedule.query(
      `
		SELECT JSON_ARRAYAGG(start) as dates from (select distinct DATE_FORMAT(start, '%Y-%c-%d') as start from ${N_SCHEDULE} where start > ?)  ${N_SCHEDULE}_temp
		`,
      [new Date()],
    );

    return dates[0].dates;
  }

  async addEventService(userId: number, eventService: addEventServiceDto) {
    const isOwner = await this.isEventOwner(userId, eventService.eventId);
    if (isOwner) {
      await this.eventServices.save({
        event_id: eventService.eventId,
        schedule_id: eventService.scheduleId,
      });
      return await this.getEventServices([eventService.eventId]);
    } else {
      throw new UnauthorizedException('user not allowed to change this event');
    }
  }

  async deleteEventService(userId: number, eventServiceId: number) {
    const isOwner = await this.isEventServiceOwner(userId, eventServiceId);

    if (isOwner) {
      const res = await this.eventServices.delete({ id: eventServiceId });
      return { success: !!res.affected };
    } else {
      throw new UnauthorizedException(
        'user unauthorized to perform this action',
      );
    }
  }

  async checkEventServicesNotBooked(eventId: number) {
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
          { id: eventId },
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
      throw new UnauthorizedException('user unauthorized');
    }
  }
}
