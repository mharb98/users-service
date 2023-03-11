import { Controller, Get, HttpCode, Param, Put } from '@nestjs/common';
import {
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { OrganizationProfileEntity } from './entities/organization-profile.entity';
import { OrganizationProfilesService } from './organization-profiles.service';

@ApiTags('Organization Profiles')
@Controller('organization-profiles')
export class OrganizationProfilesController {
  constructor(
    private organizationProfilesService: OrganizationProfilesService,
  ) {}

  @ApiOperation({
    description:
      'Takes an organization profile id and returns user organization details',
  })
  @ApiOkResponse({
    description: 'Returns an organization profile entity',
    type: OrganizationProfileEntity,
  })
  @ApiNotFoundResponse({
    description: 'Could not find specified organization profile',
  })
  @Get(':organizationProfileId')
  async getOrganizationProfile(
    @Param('organizationProfileId') organizationProfileId: number,
  ): Promise<OrganizationProfileEntity> {
    return await this.organizationProfilesService.getOrganizationProfile(
      organizationProfileId,
    );
  }

  @ApiOperation({
    description:
      'Takes an organization profile id to enable a user to access organization resources',
  })
  @ApiNoContentResponse({
    description: 'User has been enable successfully',
  })
  @ApiNotFoundResponse({
    description: 'Could not find specified organization profile',
  })
  @HttpCode(204)
  @Put(':organizationProfileId/enable-user')
  async enableUser(
    @Param('organizationProfileId') organizationProfileId: number,
  ): Promise<void> {
    await this.organizationProfilesService.enableUser(organizationProfileId);
  }

  @ApiOperation({
    description:
      'Takes an organization profile id to disable a user from accessing organization resources',
  })
  @ApiNoContentResponse({
    description: 'User has been banned from organization successfully',
  })
  @ApiNotFoundResponse({
    description: 'Could not find specified organization profile',
  })
  @HttpCode(204)
  @Put(':organizationProfileId/disable-user')
  async disableUser(
    @Param('organizationProfileId') organizationProfileId: number,
  ): Promise<void> {
    await this.organizationProfilesService.disableUser(organizationProfileId);
  }
}
