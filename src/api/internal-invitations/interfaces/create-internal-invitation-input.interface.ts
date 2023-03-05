import { InternalRole } from '@prisma/client';

export interface CreateInternalInvitationInput {
  email: string;
  role: InternalRole;
}
