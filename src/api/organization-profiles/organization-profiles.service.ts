import { Injectable } from '@nestjs/common';
import { OrganizationProfileEntity } from './entities/organization-profile.entity';

@Injectable()
export class OrganizationProfilesService {
  constructor() {}

  async getOrganizationProfile(
    organizationProfileId: number,
  ): Promise<OrganizationProfileEntity> {
    return;
  }

  async enableUser(organizationProfileId: number): Promise<void> {
    return;
  }

  async disableUser(organizationProfileId: number): Promise<void> {
    return;
  }
}
