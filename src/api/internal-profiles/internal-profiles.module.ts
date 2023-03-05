import { Module } from '@nestjs/common';
import { InternalProfilesService } from './internal-profiles.service';

@Module({
  imports: [],
  providers: [InternalProfilesService],
  controllers: [],
})
export class InternalProfilesModule {}
