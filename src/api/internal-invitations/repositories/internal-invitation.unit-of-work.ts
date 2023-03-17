import { Injectable } from '@nestjs/common';
import { InternalRole } from '@prisma/client';
import { PrismaService } from '../../../prisma/prisma.service';
import { InternalProfileEntity } from '../../internal-profiles/entities/internal-profile.entity';
import { InternalProfileSerializer } from '../../internal-profiles/serializers/internal-profile-include.serializer';
import { UserEntity } from '../../users/entities/user.entity';

@Injectable()
export class InternalInvitationUnitOfWork {
  constructor(private prisma: PrismaService) {}

  async createInternalProfile(
    email: string,
    role: InternalRole,
    password: string,
  ): Promise<InternalProfileEntity> {
    return await this.prisma.$transaction(async (tx: PrismaService) => {
      // 1. Create the user
      const user: UserEntity = await tx.user.upsert({
        where: {
          email: email,
        },
        create: {
          email: email,
          password: password,
          verified: true,
        },
        update: {},
      });

      // 2. Associate the user with an internal user entity
      const internalProfile: InternalProfileEntity =
        await tx.internalProfile.create({
          data: {
            user: { connect: { id: user.id } },
            roles: { create: { role: role } },
          },
          include: InternalProfileSerializer,
        });

      // // 3. Add the internal role to the user
      // await tx.internalRoles.create({
      //   data: {
      //     internalProfile: { connect: { id: internalProfile.id } },
      //     role: role,
      //   },
      // });

      // 4. Mark the internal invitation entity as accepted
      await tx.internalInvitation.update({
        where: {
          email: email,
        },
        data: {
          acceptedAt: new Date(),
        },
      });

      return internalProfile;
    });
  }
}
