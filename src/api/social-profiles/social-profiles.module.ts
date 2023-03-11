import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { PrismaSocialProfiles } from './repositories/prisma-social-profiles.repository';
import { SocialProfilesController } from './social-profiles.controller';
import { SocialProfilesService } from './social-profiles.service';

@Module({
  imports: [PrismaModule],
  controllers: [SocialProfilesController],
  providers: [
    SocialProfilesService,
    {
      provide: 'SocialProfileRepository',
      useClass: PrismaSocialProfiles,
    },
  ],
})
export class SocialProfilesModule {}
