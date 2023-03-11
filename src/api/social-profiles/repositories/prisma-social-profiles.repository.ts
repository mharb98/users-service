import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { SocialProfileEntity } from '../entities/social-profile.entity';
import { UpdateSocialProfileInput } from '../interfaces/update-social-profile-input.interface';
import { SocialProfileIncludes } from '../serializers/social-profile-includes.serializer';
import { SocialProfileRepository } from './social-profiles-repository.interface';

@Injectable()
export class PrismaSocialProfiles implements SocialProfileRepository {
  constructor(private prisma: PrismaService) {}

  async findUnique(socialProfileId: number): Promise<SocialProfileEntity> {
    try {
      return await this.prisma.socialProfile.findUnique({
        where: { id: socialProfileId },
        include: SocialProfileIncludes,
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(
          'Could not find the specified social profile',
        );
      }

      throw new InternalServerErrorException(
        'Could not get the social profile',
      );
    }
  }

  async findOneAndUpdate(
    socialProfileId: number,
    updateSocialProfileInput: UpdateSocialProfileInput,
  ): Promise<SocialProfileEntity> {
    try {
      return await this.prisma.socialProfile.update({
        where: { id: socialProfileId },
        data: updateSocialProfileInput,
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(
          'Could not find specified social profile id',
        );
      }

      throw new InternalServerErrorException(
        'Could not update the social profile',
      );
    }
  }
}
