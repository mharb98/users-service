import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { OrganizationInvitationEntity } from '../entities/organization-invitation.entity';
import { CreateOrganizationInvitationInput } from '../interfaces/create-organization-invitation-input.interface';
import { FindOrganizationInvitation } from '../interfaces/find-organization-invitation.interface';
import { OrganizationInvitationsRepository } from './organization-invitations-repository.interface';

@Injectable()
export class PrismaOrganizationInvitations
  implements OrganizationInvitationsRepository
{
  constructor(private prisma: PrismaService) {}
  async create(
    createOrganizationInvitationInput: CreateOrganizationInvitationInput,
  ): Promise<OrganizationInvitationEntity> {
    try {
      return await this.prisma.organizationInvitation.create({
        data: {
          ...createOrganizationInvitationInput,
        },
      });
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ConflictException('User has already been invited');
      } else if (error.code === 'P2025') {
        throw new NotFoundException('Invalid parameters');
      }

      throw new InternalServerErrorException('Could not process your request');
    }
  }

  async delete(id: number): Promise<void> {
    try {
      await this.prisma.organizationInvitation.delete({
        where: {
          id: id,
        },
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException('Could not find the specified invitation');
      }

      throw new InternalServerErrorException('Could not process your request');
    }
  }

  async findOne(
    findOrganizationInvitation: FindOrganizationInvitation,
  ): Promise<OrganizationInvitationEntity> {
    try {
      return await this.prisma.organizationInvitation.findFirst({
        where: {
          ...findOrganizationInvitation,
        },
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException('Coult not find the specified invitation');
      }

      throw new InternalServerErrorException('Could not process your request');
    }
  }
}
