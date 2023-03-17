import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { OrganizationEntity } from '../entities/organization.entity';
import { CreateOrganizationInput } from '../interfaces/ create-organization-input.interface';
import { OrganizationRepository } from './organizations-repository.interface';

@Injectable()
export class PrismaOrganizations implements OrganizationRepository {
  constructor(private prisma: PrismaService) {}

  async create(
    createOrganizationInput: CreateOrganizationInput,
  ): Promise<OrganizationEntity> {
    try {
      return await this.prisma.organization.create({
        data: createOrganizationInput,
      });
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ConflictException('Organization already exists');
      }

      throw new InternalServerErrorException('Failed to create organization');
    }
  }
}
