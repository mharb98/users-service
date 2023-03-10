import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { InternalProfileEntity } from '../entities/internal-profile.entity';
import { UpdateInternalProfileInput } from '../interfaces/update-internal-profile-input.interface';
import { InternalProfileSerializer } from '../serializers/internal-profile-include.serializer';
import { InternalProfileRepository } from './internal-profile-repository.interface';

@Injectable()
export class PrismaInternalProfile implements InternalProfileRepository {
  constructor(private prisma: PrismaService) {}

  async findUnique(internalProfileId: number): Promise<InternalProfileEntity> {
    try {
      return await this.prisma.internalProfile.findUniqueOrThrow({
        where: { id: internalProfileId },
        include: InternalProfileSerializer,
      });
    } catch (error) {
      console.log(error);
      if (error.code === 'P2025') {
        throw new NotFoundException('Could not find internal profile');
      }

      throw new InternalServerErrorException('Could not get internal Profile');
    }
  }

  async findOneAndUpdate(
    internalProfileId: number,
    updateInternalProfileInput: UpdateInternalProfileInput,
  ): Promise<InternalProfileEntity> {
    try {
      return await this.prisma.internalProfile.update({
        where: { id: internalProfileId },
        data: updateInternalProfileInput,
      });
    } catch (error) {
      console.log(error);
      if (error.code === 'P2025') {
        throw new NotFoundException('Could not find internal profile');
      }

      throw new InternalServerErrorException(
        'Could not update internal Profile',
      );
    }
  }
}
