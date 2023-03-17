import { Inject, Injectable } from '@nestjs/common';
import { CreateOrganizationInput } from './interfaces/ create-organization-input.interface';
import { OrganizationRepository } from './repositories/organizations-repository.interface';

@Injectable()
export class OrganizationsService {
  constructor(
    @Inject('OrganizationsRepository')
    private repository: OrganizationRepository,
  ) {}

  async createOrganization(createOrganizationInput: CreateOrganizationInput) {
    await this.repository.create(createOrganizationInput);
  }
}
