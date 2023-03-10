import { Inject, Injectable } from '@nestjs/common';
import { InternalProfileEntity } from './entities/internal-profile.entity';
import { InternalProfileRepository } from './repositories/internal-profile-repository.interface';

@Injectable()
export class InternalProfilesService {
  constructor(
    @Inject('InternalProfilesRepository')
    private repository: InternalProfileRepository,
  ) {}

  async getInternalProfile(
    internalProfileId: number,
  ): Promise<InternalProfileEntity> {
    return await this.repository.findUnique(internalProfileId);
  }

  async enableUser(internalProfileId: number): Promise<void> {
    await this.repository.findOneAndUpdate(internalProfileId, {
      banned: false,
    });
  }

  async disableUser(internalProfileId: number): Promise<void> {
    await this.repository.findOneAndUpdate(internalProfileId, {
      banned: true,
    });
  }
}
