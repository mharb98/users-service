import { OrganizationEntity } from '../entities/organization.entity';
import { CreateOrganizationInput } from '../interfaces/ create-organization-input.interface';

export interface OrganizationRepository {
  create(
    createOrganizationInput: CreateOrganizationInput,
  ): Promise<OrganizationEntity>;
}
