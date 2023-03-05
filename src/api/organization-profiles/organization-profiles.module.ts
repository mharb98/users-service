import { Module } from '@nestjs/common';
import { OrganizationProfilesService } from './organization-profiles.service';
import { OrganizationProfilesController } from './organization-profiles.controller';

@Module({
  providers: [OrganizationProfilesService],
  controllers: [OrganizationProfilesController],
})
export class OrganizationProfilesModule {}
