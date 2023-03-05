import { InternalInvitationEntity } from '../entities/internal-invitation.entity';
import { CreateInternalInvitationInput } from '../interfaces/create-internal-invitation-input.interface';
import { FindOneInvitationInput } from '../interfaces/find-one-invitation-input.interface';

export interface InternalInvitationsRepository {
  create(
    createInternalInvitationInput: CreateInternalInvitationInput,
  ): Promise<InternalInvitationEntity>;
  delete(id: number): Promise<void>;
  findOne(
    findUniqueInvitationInput: FindOneInvitationInput,
  ): Promise<InternalInvitationEntity>;
}
