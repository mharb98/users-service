import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { CommonModule } from '../../common/common.module';
import { PrismaModule } from '../../prisma/prisma.module';
import { OrganizationInvitationsController } from './organization-invitations.controller';
import { OrganizationInvitationsService } from './organization-invitations.service';
import { OrganizationInvitationUnitOfWork } from './repositories/organization-invitation.unit-of-work';
import { PrismaOrganizationInvitations } from './repositories/prisma-organization-invitations.repository';

@Module({
  imports: [
    PrismaModule,
    CommonModule,
    BullModule.registerQueue({
      name: 'mailing-queue',
    }),
  ],
  controllers: [OrganizationInvitationsController],
  providers: [
    OrganizationInvitationsService,
    OrganizationInvitationUnitOfWork,
    {
      provide: 'OrganizationInvitationsRepository',
      useClass: PrismaOrganizationInvitations,
    },
  ],
})
export class OrganizationInvitationsModule {}
