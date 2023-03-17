import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { CommonModule } from '../../common/common.module';
import { PrismaModule } from '../../prisma/prisma.module';
import { UsersProducersModule } from '../../users-producers/users-producers.module';
import { InternalInvitationsController } from './internal-invitations.controller';
import { InternalInvitationsService } from './internal-invitations.service';
import { InternalInvitationUnitOfWork } from './repositories/internal-invitation.unit-of-work';
import { PrismaInternalInvitations } from './repositories/prisma-internal-invitations.repository';

@Module({
  imports: [
    PrismaModule,
    CommonModule,
    BullModule.registerQueue({
      name: 'mailing-queue',
    }),
    UsersProducersModule,
  ],
  providers: [
    InternalInvitationsService,
    {
      provide: 'InternalInvitationsRepository',
      useClass: PrismaInternalInvitations,
    },
    InternalInvitationUnitOfWork,
  ],
  controllers: [InternalInvitationsController],
})
export class InternalInvitationsModule {}
