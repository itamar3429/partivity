import { Module } from '@nestjs/common';
import { ProvidersModule } from './providers/providers.module';
import { ClientModule } from './client/client.module';

@Module({
  imports: [ProvidersModule, ClientModule],
})
export class ApiModule {}
