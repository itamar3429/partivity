import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import ServiceAvailability from '../../typeorm/availability.entity';
import FoodService from '../../typeorm/food.entity';
import GeneralService from '../../typeorm/general.entity';
import ServiceImages from '../../typeorm/images.entity';
import LocationService from '../../typeorm/location.entity';
import MusicService from '../../typeorm/music.entity';
import { Repository } from 'typeorm';
import { addServiceDto } from './providers.dto';
import Service from '../../typeorm/services.entity';

@Injectable()
export class ProvidersService {
  constructor(
    @InjectRepository(LocationService)
    private readonly locationService: Repository<LocationService>,
    @InjectRepository(GeneralService)
    private readonly generalService: Repository<GeneralService>,
    @InjectRepository(MusicService)
    private readonly musicService: Repository<MusicService>,
    @InjectRepository(FoodService)
    private readonly foodService: Repository<FoodService>,
    @InjectRepository(ServiceImages)
    private readonly serviceImages: Repository<ServiceImages>,
    @InjectRepository(ServiceAvailability)
    private readonly serviceAvailability: Repository<ServiceAvailability>,
    @InjectRepository(Service)
    private readonly serviceRepo: Repository<Service>,
  ) {}

  async addService(data: addServiceDto, userId: number) {
    const service = this.serviceRepo.create({ ...data, userId });
    return this.serviceRepo.save(service);
    if (false) {
      if (data.service == 'food') {
        const service = this.foodService.create({
          description: data.description,
          name: data.name,
          title: data.title,
          type: data.serviceType,
          userId,
        });
        return this.foodService.save(service);
      }
      if (data.service == 'general') {
        const service = this.generalService.create({
          description: data.description,
          name: data.name,
          title: data.title,
          type: data.serviceType,
          userId,
        });
        return this.generalService.save(service);
      }
      if (data.service == 'location') {
        const service = this.locationService.create({
          description: data.description,
          title: data.title,
          userId,
          address: data.address,
          capacity: data.capacity,
          city: data.city,
          country: data.country,
        });
        return this.locationService.save(service);
      }
      if (data.service == 'music') {
        const service = this.musicService.create({
          description: data.description,
          name: data.name,
          title: data.title,
          musicType: data.serviceType,
          userId,
        });
        return this.musicService.save(service);
      }
    }
  }

  async getServices(userId: number) {
    const services = await this.serviceRepo.findBy({ userId });

    return services;

    if (false) {
      const [food, general, locations, music] = await Promise.all([
        this.foodService.findBy({ userId }),
        this.generalService.findBy({ userId }),
        this.locationService.findBy({ userId }),
        this.musicService.findBy({ userId }),
      ]);
      return { food, general, locations, music };
    }
  }
}
