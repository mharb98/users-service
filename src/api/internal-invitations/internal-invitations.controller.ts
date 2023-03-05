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
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { AcceptInvitationDto } from './dtos/accept-invitation.dto';
import { InternalInvitationDto } from './dtos/internal-invitation.dto';
import { InternalInvitationsService } from './internal-invitations.service';

@ApiTags('Internal Invitations')
@Controller('internal-invitations')
export class InternalInvitationsController {
  constructor(private internalInvitationsService: InternalInvitationsService) {}

  @ApiOperation({
    description: 'Sends an invitation to a user to join as an internal user',
    summary:
      'Takes in an email and role, sends the invitation. It typically returns a string that invitation is created',
  })
  @ApiConflictResponse({
    description: 'User has already been invited',
  })
  @ApiBadRequestResponse({
    description: 'User is already a member',
  })
  @Post()
  async createInternalInvitation(
    @Body() internalInvitationDto: InternalInvitationDto,
  ): Promise<string> {
    return await this.internalInvitationsService.sendInternalInvitation(
      internalInvitationDto.email,
      internalInvitationDto.role,
    );
  }

  @ApiOperation({
    description: 'Resends an invitation to a user with a token',
    summary:
      'Takes in an email, and resends the invitation to an already invited user',
  })
  @ApiNoContentResponse({
    description: 'Invitation has been resent',
  })
  @ApiBadRequestResponse({
    description: 'User is already a member',
  })
  @ApiNotFoundResponse({
    description: 'Could not find specified email',
  })
  @HttpCode(204)
  @Post(':invitationId/resend-invitation')
  async resendInvitation(
    @Param('invitationId') invitationId: number,
  ): Promise<void> {
    await this.internalInvitationsService.resendInvitation(invitationId);
  }

  @ApiOperation({
    description:
      'Takes an internal invitation id, and deletes it. If invitation is already accepted, and error is thrown',
  })
  @ApiNoContentResponse({
    description: 'Invitation successfully deleted',
  })
  @ApiNotFoundResponse({
    description: 'Could not find invitation',
  })
  @ApiBadRequestResponse({
    description: 'Invitation has already been accepted',
  })
  @HttpCode(204)
  @Delete(':internalInvitationId')
  async deleteInvitation(
    @Param('internalInvitationId') internalInvitationId: number,
  ): Promise<void> {
    await this.internalInvitationsService.deleteInvitation(
      internalInvitationId,
    );
  }

  @ApiOperation({
    description: 'Accepts an invitation',
    summary: 'Takes in a token and accepts the invitation if it is still valid',
  })
  @ApiNoContentResponse({
    description: 'Invitation has been accepted',
  })
  @ApiBadRequestResponse({
    description:
      'Token has expired OR Incorrect token OR Invitation already accepted',
  })
  @ApiNotFoundResponse({
    description: 'User was not invited',
  })
  @Post('accept-invitation')
  async acceptInvitation(
    @Body() acceptInvitationDto: AcceptInvitationDto,
  ): Promise<void> {
    await this.internalInvitationsService.acceptInvitation(
      acceptInvitationDto.email,
      acceptInvitationDto.token,
    );
  }
}
