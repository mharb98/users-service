import { Module } from '@nestjs/common';
import { BrokersModule } from '../Brokers/brokers.module';
import { OrganizationsConsumer } from './organizations.consumer';
import { PrismaOrganizations } from './repositories/prisma-organizations.repository';
import { OrganizationsService } from './organizations.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [BrokersModule, PrismaModule],
  providers: [
    OrganizationsConsumer,
    {
      provide: 'OrganizationsRepository',
      useClass: PrismaOrganizations,
    },
    OrganizationsService,
  ],
})
export class OrganizationsModule {}
