import { Module } from '@nestjs/common';
import { OrganizationProfilesService } from './organization-profiles.service';
import { OrganizationProfilesController } from './organization-profiles.controller';
import { PrismaModule } from '../../prisma/prisma.module';
import { PrismaOrganizationProfiles } from './repositories/prisma-organization-profiles.repository';

@Module({
  imports: [PrismaModule],
  providers: [
    {
      provide: 'OrganizationProfileRepository',
      useClass: PrismaOrganizationProfiles,
    },
    OrganizationProfilesService,
  ],
  controllers: [OrganizationProfilesController],
})
export class OrganizationProfilesModule {}
