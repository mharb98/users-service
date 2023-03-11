import { Body, Controller, Get, HttpCode, Param, Put } from '@nestjs/common';
import {
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { UpdateSocialProfileDto } from './dtos/update-social-profile.dto';
import { SocialProfileEntity } from './entities/social-profile.entity';
import { SocialProfilesService } from './social-profiles.service';

@ApiTags('Social Profiles')
@Controller('social-profiles')
export class SocialProfilesController {
  constructor(private socialProfilesService: SocialProfilesService) {}

  @ApiOperation({
    description:
      'Takes a social profile id and returns associated profile for user',
  })
  @ApiOkResponse({
    description: 'Returns a social profile entity for user',
    type: SocialProfileEntity,
  })
  @ApiNotFoundResponse({
    description: 'Could not find the specified profile for user',
  })
  @Get(':socialProfileId')
  async getSocialProfile(
    @Param('socialProfileId') socialProfileId: number,
  ): Promise<SocialProfileEntity> {
    return await this.socialProfilesService.getSocialProfile(socialProfileId);
  }

  @ApiOperation({
    description:
      'Takes a social profile id and enables a user to access his social profile account',
  })
  @ApiNoContentResponse({ description: 'User has been enabled successfully' })
  @ApiNotFoundResponse({
    description: 'Could not find the specified user',
  })
  @HttpCode(204)
  @Put(':socialProfileId/enable-user')
  async enableUser(@Param('socialProfileId') socialProfileId: number) {
    await this.socialProfilesService.enableUser(socialProfileId);
  }

  @ApiOperation({
    description:
      'Takes a social profile id and disables a user from accessing his social profile account',
  })
  @ApiNoContentResponse({ description: 'User has been disabled successfully' })
  @ApiNotFoundResponse({
    description: 'Could not find the specified user',
  })
  @HttpCode(204)
  @Put(':socialProfileId/disable-user')
  async disableUser(@Param('socialProfileId') socialProfileId: number) {
    await this.socialProfilesService.disableUser(socialProfileId);
  }

  @ApiOperation({ description: 'Used for updating social profile details' })
  @ApiOkResponse({
    description: 'Updates user social profile attributes',
    type: SocialProfileEntity,
  })
  @ApiNotFoundResponse({
    description: 'Could not find the specified social profile',
  })
  @Put(':socialProfileId')
  async updateSocialProfile(
    @Param('socialProfileId') socialProfileId: number,
    @Body() updateSocialProfileDto: UpdateSocialProfileDto,
  ): Promise<SocialProfileEntity> {
    return await this.socialProfilesService.updateSocialProfile(
      socialProfileId,
      updateSocialProfileDto,
    );
  }
}
