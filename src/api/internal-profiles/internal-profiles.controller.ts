import { Controller, Get, HttpCode, Param, Put } from '@nestjs/common';
import {
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { InternalProfileEntity } from './entities/internal-profile.entity';
import { InternalProfilesService } from './internal-profiles.service';

@ApiTags('Internal Profiles')
@Controller('internal-users')
export class InternalProfilesController {
  constructor(private internalProfilesService: InternalProfilesService) {}

  @ApiOperation({
    description:
      'Takes an internal profile id as a parameter and returns profile details',
  })
  @ApiOkResponse({
    description: 'User has been successfully found',
    type: InternalProfileEntity,
  })
  @ApiNotFoundResponse({
    description: 'Could not find specified profile',
  })
  @Get(':internalProfileId')
  async getInternalProfile(
    @Param('internalProfileId') internalProfileId: number,
  ): Promise<InternalProfileEntity> {
    return await this.internalProfilesService.getInternalProfile(
      internalProfileId,
    );
  }

  @ApiOperation({
    description: 'Takes an internal profile id as a parameter to enable use',
  })
  @ApiNoContentResponse({ description: 'User has been enabled successfully' })
  @ApiNotFoundResponse({ description: 'Could not find specified user' })
  @HttpCode(204)
  @Put(':internalProfileId/enable-user')
  async enableUser(
    @Param('internalProfileId') internalProfileId: number,
  ): Promise<void> {
    await this.internalProfilesService.enableUser(internalProfileId);
  }

  @ApiOperation({
    description: 'Takes an internal profile id as a parameter to disable use',
  })
  @ApiNoContentResponse({ description: 'User has been disabled successfully' })
  @ApiNotFoundResponse({ description: 'Could not find specified user' })
  @HttpCode(204)
  @Put(':internalProfileId/disable-user')
  async disableUser(
    @Param('internalProfileId') internalProfileId: number,
  ): Promise<void> {
    await this.internalProfilesService.disableUser(internalProfileId);
  }
}
