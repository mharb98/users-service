import { OrganizationInvitationEntity } from '../entities/organization-invitation.entity';
import { CreateOrganizationInvitationInput } from '../interfaces/create-organization-invitation-input.interface';
import { FindOrganizationInvitation } from '../interfaces/find-organization-invitation.interface';

export interface OrganizationInvitationsRepository {
  create(
    createOrganizationInvitationInput: CreateOrganizationInvitationInput,
  ): Promise<OrganizationInvitationEntity>;
  delete(id: number): Promise<void>;
  findOne(
    findOrganizationInvitation: FindOrganizationInvitation,
  ): Promise<OrganizationInvitationEntity>;
}
