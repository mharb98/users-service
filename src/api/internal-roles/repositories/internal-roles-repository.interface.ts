import { InternalRole } from '@prisma/client';
import { InternalRoleEntity } from '../entities/internal-role.entity';

export interface InternalRolesRepository {
  create(
    internalProfileId: number,
    role: InternalRole,
  ): Promise<InternalRoleEntity>;

  delete(internalProfileId: number, role: InternalRole): Promise<void>;
}
