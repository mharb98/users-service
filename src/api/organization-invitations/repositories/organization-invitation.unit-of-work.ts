import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { OrganizationProfileEntity } from '../../organization-profiles/entities/organization-profile.entity';
import { UserEntity } from '../../users/entities/user.entity';
import { OrganizationInvitationEntity } from '../entities/organization-invitation.entity';

@Injectable()
export class OrganizationInvitationUnitOfWork {
  constructor(private prisma: PrismaService) {}

  async createOrganizationProfile(
    organizationInvitation: OrganizationInvitationEntity,
    password: string,
  ): Promise<UserEntity> {
    return await this.prisma.$transaction(async (tx: PrismaService) => {
      // 1. Create the user
      const user: UserEntity = await tx.user.upsert({
        where: {
          email: organizationInvitation.email,
        },
        create: {
          email: organizationInvitation.email,
          password: password,
          verified: true,
        },
        update: {},
      });

      // 2. Associate the user with an organization user entity
      const organizationProfile: OrganizationProfileEntity =
        await tx.organizationProfile.create({
          data: {
            organization: {
              connect: { id: organizationInvitation.organizationId },
            },
            user: { connect: { id: user.id } },
          },
        });

      // 3. Add the organization role to the user
      await tx.userDepartment.create({
        data: {
          organizationProfile: { connect: { id: organizationProfile.id } },
          role: organizationInvitation.role,
          department: organizationInvitation.department,
        },
      });

      // 4. Mark the organization invitation entity as accepted
      await tx.organizationInvitation.update({
        where: {
          email: organizationInvitation.email,
        },
        data: {
          acceptedAt: new Date(),
        },
      });

      return user;
    });
  }
}
