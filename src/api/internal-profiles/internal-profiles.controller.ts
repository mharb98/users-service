import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { InternalProfilesService } from './internal-profiles.service';

@ApiTags('Internal Users')
@Controller('internal-users')
export class InternalProfilesController {
  constructor(private internalProfilesService: InternalProfilesService) {}

  // async
}
