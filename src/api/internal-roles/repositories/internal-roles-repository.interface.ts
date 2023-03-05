import { InternalRole, InternalRoles } from '@prisma/client';

export interface InternalRolesRepository {
  create(internalProfileId: number, role: InternalRole): Promise<InternalRoles>;

  delete(internalProfileId: number, role: InternalRole): Promise<void>;
}
