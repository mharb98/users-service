import { UpdateInternalProfileInput } from '../../internal-profiles/interfaces/update-internal-profile-input.interface';
import { OrganizationProfileEntity } from '../entities/organization-profile.entity';
import { QueryOrganizationProfiles } from '../interfaces/query-organization-profiles.interface';

export interface OrganizationProfileRepository {
  findUnique(organizationProfileId: number): Promise<OrganizationProfileEntity>;
  findMany(
    queryOrganizationProfiles: QueryOrganizationProfiles,
  ): Promise<OrganizationProfileEntity[]>;
  findOneAndUpdate(
    organizationProfileId: number,
    updateOrganizationProfileInput: UpdateInternalProfileInput,
  ): Promise<OrganizationProfileEntity>;
}
