import { Inject, Injectable } from '@nestjs/common';
import { InternalRole } from '@prisma/client';
import { InternalRolesRepository } from './repositories/internal-roles-repository.interface';

@Injectable()
export class InternalRolesService {
  constructor(
    @Inject('InternalRolesRepository')
    private repository: InternalRolesRepository,
  ) {}

  async addRoleToUser(
    internalProfileId: number,
    role: InternalRole,
  ): Promise<void> {
    await this.repository.create(internalProfileId, role);
  }

  async removeRoleFromUser(
    internalProfileId: number,
    role: InternalRole,
  ): Promise<void> {
    await this.repository.delete(internalProfileId, role);
  }
}
