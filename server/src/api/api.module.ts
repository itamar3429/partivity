import { Module } from '@nestjs/common';
import { ProvidersModule } from './providers/providers.module';
import { ClientModule } from './client/client.module';
import { PublicModule } from './public/public.module';

@Module({
  imports: [ProvidersModule, ClientModule, PublicModule],
})
export class ApiModule {}
