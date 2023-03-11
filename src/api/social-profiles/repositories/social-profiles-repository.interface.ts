import { SocialProfileEntity } from '../entities/social-profile.entity';
import { UpdateSocialProfileInput } from '../interfaces/update-social-profile-input.interface';

export interface SocialProfileRepository {
  findUnique(socialProfileId: number): Promise<SocialProfileEntity>;
  findOneAndUpdate(
    socialProfileId: number,
    updateSocialProfileInput: UpdateSocialProfileInput,
  ): Promise<SocialProfileEntity>;
}
