import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { UpdateInternalProfileInput } from '../../internal-profiles/interfaces/update-internal-profile-input.interface';
import { OrganizationProfileEntity } from '../entities/organization-profile.entity';
import { QueryOrganizationProfiles } from '../interfaces/query-organization-profiles.interface';
import { OrganizationProfileIncludes } from '../serializers/organization-profile-includes.serializer';
import { OrganizationProfileRepository } from './organization-profile-repository.interface';

@Injectable()
export class PrismaOrganizationProfiles
  implements OrganizationProfileRepository
{
  constructor(private prisma: PrismaService) {}

  async findUnique(
    organizationProfileId: number,
  ): Promise<OrganizationProfileEntity> {
    try {
      return await this.prisma.organizationProfile.findUnique({
        where: { id: organizationProfileId },
        include: OrganizationProfileIncludes,
      });
    } catch (error) {
      console.log(error);
      if (error.code === 'P2025') {
        throw new NotFoundException('Could not find organization profile');
      }

      throw new InternalServerErrorException(
        'Could not get organization profile',
      );
    }
  }

  async findMany(
    queryOrganizationProfiles: QueryOrganizationProfiles,
  ): Promise<OrganizationProfileEntity[]> {
    const { banned, userId, userName, organizationId, organizationName } =
      queryOrganizationProfiles;

    try {
      return await this.prisma.organizationProfile.findMany({
        where: {
          banned,
          userId,
          organizationId,
          organization: {
            name: organizationName,
          },
          user: {
            name: userName,
          },
        },
        include: OrganizationProfileIncludes,
      });
    } catch (error) {
      throw new InternalServerErrorException(
        'Could not query organization profiles',
      );
    }
  }

  async findOneAndUpdate(
    organizationProfileId: number,
    updateOrganizationProfileInput: UpdateInternalProfileInput,
  ): Promise<OrganizationProfileEntity> {
    try {
      return await this.prisma.organizationProfile.update({
        where: {
          id: organizationProfileId,
        },
        data: updateOrganizationProfileInput,
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(
          'Could not find the specified organization profile',
        );
      }

      throw new InternalServerErrorException(
        'Could not update the organization profile',
      );
    }
  }
}
