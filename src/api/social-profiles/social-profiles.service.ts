import { Inject, Injectable } from '@nestjs/common';
import { UpdateSocialProfileDto } from './dtos/update-social-profile.dto';
import { SocialProfileEntity } from './entities/social-profile.entity';
import { SocialProfileRepository } from './repositories/social-profiles-repository.interface';

@Injectable()
export class SocialProfilesService {
  constructor(
    @Inject('SocialProfileRepository')
    private repository: SocialProfileRepository,
  ) {}

  async getSocialProfile(
    socialProfileId: number,
  ): Promise<SocialProfileEntity> {
    return await this.repository.findUnique(socialProfileId);
  }

  async enableUser(socialProfileId: number) {
    await this.repository.findOneAndUpdate(socialProfileId, { banned: false });
  }

  async disableUser(socialProfileId: number) {
    await this.repository.findOneAndUpdate(socialProfileId, { banned: true });
  }

  async updateSocialProfile(
    socialProfileId: number,
    updateSocialProfileDto: UpdateSocialProfileDto,
  ): Promise<SocialProfileEntity> {
    return await this.repository.findOneAndUpdate(socialProfileId, {
      gender: updateSocialProfileDto.gender,
    });
  }
}
