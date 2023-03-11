import { Inject, Injectable } from '@nestjs/common';
import { OrganizationProfileEntity } from './entities/organization-profile.entity';
import { OrganizationProfileRepository } from './repositories/organization-profile-repository.interface';

@Injectable()
export class OrganizationProfilesService {
  constructor(
    @Inject('OrganizationProfileRepository')
    private repository: OrganizationProfileRepository,
  ) {}

  async getOrganizationProfile(
    organizationProfileId: number,
  ): Promise<OrganizationProfileEntity> {
    return await this.repository.findUnique(organizationProfileId);
  }

  async enableUser(organizationProfileId: number): Promise<void> {
    await this.repository.findOneAndUpdate(organizationProfileId, {
      banned: false,
    });
  }

  async disableUser(organizationProfileId: number): Promise<void> {
    await this.repository.findOneAndUpdate(organizationProfileId, {
      banned: true,
    });
  }
}
