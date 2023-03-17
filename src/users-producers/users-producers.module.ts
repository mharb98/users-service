import { Module } from '@nestjs/common';
import { BrokersModule } from '../Brokers/brokers.module';
import { InternalUserProducersService } from './internal-user-producers/internal-user-producers.service';

@Module({
  imports: [BrokersModule],
  providers: [InternalUserProducersService],
  exports: [InternalUserProducersService],
})
export class UsersProducersModule {}
