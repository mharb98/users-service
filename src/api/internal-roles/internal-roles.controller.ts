import {
  Body,
  Controller,
  Delete,
  HttpCode,
  Param,
  Post,
} from '@nestjs/common';
import {
  ApiConflictResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { InternalRoleDto } from './dtos/internal-role.dto';
import { InternalRolesService } from './internal-roles.service';

@ApiTags('Internal Profile Roles')
@ApiNotFoundResponse({ description: 'Internal user could not be found' })
@Controller('internal-profiles/:internalProfileId/internal-roles')
export class InternalRolesController {
  constructor(private internalRolesService: InternalRolesService) {}

  @ApiNoContentResponse({ description: 'Role has been added to user' })
  @ApiConflictResponse({ description: 'User already has that role' })
  @ApiParam({ name: 'internalProfileId' })
  @HttpCode(204)
  @Post()
  async addRoleToUser(
    @Param('internalProfileId') internalProfileId: number,
    @Body() internalRoleDto: InternalRoleDto,
  ): Promise<void> {
    await this.internalRolesService.addRoleToUser(
      internalProfileId,
      internalRoleDto.role,
    );
  }

  @ApiNoContentResponse({
    description: 'Role has been removed from user',
  })
  @ApiNotFoundResponse({
    description: 'Could not find the specified role',
  })
  @ApiParam({ name: 'internalProfileId' })
  @HttpCode(204)
  @Delete()
  async removeRoleFromUser(
    @Param('internalProfileId') internalProfileId: number,
    @Body() internalRoleDto: InternalRoleDto,
  ): Promise<void> {
    await this.internalRolesService.removeRoleFromUser(
      internalProfileId,
      internalRoleDto.role,
    );
  }
}
