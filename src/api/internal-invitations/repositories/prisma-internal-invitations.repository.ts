import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { InternalInvitationEntity } from '../entities/internal-invitation.entity';
import { CreateInternalInvitationInput } from '../interfaces/create-internal-invitation-input.interface';
import { FindOneInvitationInput } from '../interfaces/find-one-invitation-input.interface';
import { InternalInvitationsRepository } from './internal-invitations-repository.interface';

@Injectable()
export class PrismaInternalInvitations
  implements InternalInvitationsRepository
{
  constructor(private prisma: PrismaService) {}

  async create(
    createInternalInvitationInput: CreateInternalInvitationInput,
  ): Promise<InternalInvitationEntity> {
    try {
      return await this.prisma.internalInvitation.create({
        data: { ...createInternalInvitationInput },
      });
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ConflictException('User was already invited');
      }

      throw new InternalServerErrorException('Could not invite user');
    }
  }

  async delete(id: number): Promise<void> {
    try {
      await this.prisma.internalInvitation.delete({
        where: { id },
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException('Could not find invitation');
      }

      throw new InternalServerErrorException('Could not delete invitation');
    }
  }

  async findOne(
    findUniqueInvitationInput: FindOneInvitationInput,
  ): Promise<InternalInvitationEntity> {
    try {
      return await this.prisma.internalInvitation.findFirst({
        where: { ...findUniqueInvitationInput },
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException('Could not find the invitation');
      }

      throw new InternalServerErrorException(
        'An error has happened, please try again later',
      );
    }
  }
}
