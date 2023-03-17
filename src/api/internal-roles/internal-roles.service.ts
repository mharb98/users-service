import { Inject, Injectable } from '@nestjs/common';
import { InternalRole } from '@prisma/client';
import { InternalUserProducersService } from '../../users-producers/internal-user-producers/internal-user-producers.service';
import { InternalRoleEntity } from './entities/internal-role.entity';
import { InternalRolesRepository } from './repositories/internal-roles-repository.interface';

@Injectable()
export class InternalRolesService {
  constructor(
    @Inject('InternalRolesRepository')
    private repository: InternalRolesRepository,
    private internalUsersProducer: InternalUserProducersService,
  ) {}

  async addRoleToUser(
    internalProfileId: number,
    role: InternalRole,
  ): Promise<void> {
    const internalRoleEntity: InternalRoleEntity = await this.repository.create(
      internalProfileId,
      role,
    );

    await this.handleRoleAdditionEvent(internalRoleEntity);
  }

  async removeRoleFromUser(
    internalProfileId: number,
    role: InternalRole,
  ): Promise<void> {
    await this.repository.delete(internalProfileId, role);
    await this.handleRoleRemovalEvent(internalProfileId, role);
  }

  private async handleRoleAdditionEvent(
    internalRoleEntity: InternalRoleEntity,
  ) {
    switch (internalRoleEntity.role) {
      case 'Moderator':
        await this.internalUsersProducer.createModerator({
          id: internalRoleEntity.internalProfileId,
          name: internalRoleEntity.internalProfile.user.name,
          email: internalRoleEntity.internalProfile.user.email,
        });
        break;
      default:
        return;
    }
  }

  private async handleRoleRemovalEvent(
    internalProfileId: number,
    role: InternalRole,
  ) {
    switch (role) {
      case 'Moderator':
        await this.internalUsersProducer.deleteModerator(internalProfileId);
        break;
      default:
        return;
    }
  }
}
