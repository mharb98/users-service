import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InternalRole, InternalRoles } from '@prisma/client';
import { PrismaService } from '../../../prisma/prisma.service';
import { InternalRolesRepository } from './internal-roles-repository.interface';

@Injectable()
export class PrismaInternalRoles implements InternalRolesRepository {
  constructor(private prisma: PrismaService) {}

  async create(
    internalProfileId: number,
    role: InternalRole,
  ): Promise<InternalRoles> {
    try {
      return await this.prisma.internalRoles.create({
        data: {
          internalProfileId: internalProfileId,
          role: role,
        },
      });
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ConflictException('User already has the role');
      }

      throw new InternalServerErrorException(
        'Could not add the role to the user',
      );
    }
  }

  async delete(internalProfileId: number, role: InternalRole): Promise<void> {
    try {
      await this.prisma.internalRoles.delete({
        where: {
          internalProfileId_role: {
            internalProfileId: internalProfileId,
            role: role,
          },
        },
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException('Could not find the specified role');
      }

      throw new InternalServerErrorException(
        'Coult not remove the role from the user',
      );
    }
  }
}
