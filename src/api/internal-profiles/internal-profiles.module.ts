import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { InternalProfilesController } from './internal-profiles.controller';
import { InternalProfilesService } from './internal-profiles.service';
import { PrismaInternalProfile } from './repositories/prisma-internal-profile.repository';

@Module({
  imports: [PrismaModule],
  providers: [
    InternalProfilesService,
    {
      provide: 'InternalProfilesRepository',
      useClass: PrismaInternalProfile,
    },
  ],
  controllers: [InternalProfilesController],
})
export class InternalProfilesModule {}
