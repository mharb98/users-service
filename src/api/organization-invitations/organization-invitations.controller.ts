import {
  Body,
  Controller,
  Delete,
  HttpCode,
  Param,
  Post,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { AcceptInvitationDto } from './dtos/accept-invitation.dto';
import { OrganizationInvitationDto } from './dtos/create-organization-invitation.dto';
import { OrganizationInvitationEntity } from './entities/organization-invitation.entity';
import { OrganizationInvitationsService } from './organization-invitations.service';

@ApiTags('organizations-invitations')
@Controller()
export class OrganizationInvitationsController {
  constructor(
    private organizationInvitationsService: OrganizationInvitationsService,
  ) {}

  @ApiCreatedResponse({
    description: 'Invitation has successfully been sent to user',
    type: OrganizationInvitationEntity,
  })
  @ApiConflictResponse({
    description: 'User has already been invited',
  })
  @ApiBadRequestResponse({
    description: 'User has already belongs to your organization',
  })
  @ApiParam({ name: 'organizationId' })
  @Post('organizations/:organizationId/organizations-invitations')
  async createInvitation(
    @Param('organizationId') organizationId: number,
    @Body()
    organizationInvitationDto: OrganizationInvitationDto,
  ): Promise<OrganizationInvitationEntity> {
    return await this.organizationInvitationsService.createInvitation(
      organizationId,
      organizationInvitationDto,
    );
  }

  @ApiNoContentResponse({
    description: 'Invitation has been successfully deleted',
  })
  @ApiBadRequestResponse({
    description: 'Invitation has already been accepted',
  })
  @ApiNotFoundResponse({
    description: ' Coult not find the invitation',
  })
  @HttpCode(204)
  @Delete('/organization-invitations/:invitationId')
  async deleteInvitation(
    @Param('invitationId') invitationId: number,
  ): Promise<void> {
    await this.organizationInvitationsService.deleteInvitation(invitationId);
  }

  @ApiNoContentResponse({
    description: 'Invitation has been successfully resent',
  })
  @ApiBadRequestResponse({
    description: 'Invitation has already been accepted',
  })
  @ApiNotFoundResponse({
    description: 'Invitation was not found',
  })
  @HttpCode(204)
  @Post('/organization-invitations/:invitationId/resendInvitation')
  async resendInvitation(
    @Param('invitationId') invitationId: number,
  ): Promise<void> {
    await this.organizationInvitationsService.resendInvitation(invitationId);
  }

  @ApiNoContentResponse({
    description: 'Invitation has been accepted successfully',
  })
  @ApiNotFoundResponse({
    description: 'Invitation could not be found',
  })
  @ApiBadRequestResponse({
    description:
      'Invitation has already been accepted OR Token has expired OR Incorrect token',
  })
  @HttpCode(204)
  @Post('/organization-invitations/:invitationId/acceptInvitation')
  async acceptInvitation(
    @Body() acceptInvitationDto: AcceptInvitationDto,
  ): Promise<void> {
    await this.organizationInvitationsService.acceptInvitation(
      acceptInvitationDto.email,
      acceptInvitationDto.token,
    );
  }
}
