import {
  Body,
  Controller,
  Delete,
  HttpCode,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiConflictResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { AddDepartmentDto } from './dtos/add-department.dto';
import { ChangeDepartmentRoleDto } from './dtos/change-department-role.dto';
import { RemoveDepartmentDto } from './dtos/remove-department.dto';
import { UserDepartmentsService } from './user-departments.service';

@ApiTags('User Departments')
@Controller()
export class UserDepartmentsController {
  constructor(private userDepartmentsService: UserDepartmentsService) {}

  @ApiNoContentResponse({
    description: 'User successfully added to department',
  })
  @ApiConflictResponse({ description: 'User already added to department' })
  @ApiNotFoundResponse({ description: 'Could not find user' })
  @ApiParam({ name: 'organizationProfileId' })
  @HttpCode(204)
  @Post('organization-profiles/:organizationProfileId/user-departments')
  async addUserToDepartment(
    @Param('organizationProfileId') organizationProfileId: number,
    @Body() addDepartmentDto: AddDepartmentDto,
  ): Promise<void> {
    await this.userDepartmentsService.addUserToDepartment(
      organizationProfileId,
      addDepartmentDto,
    );
  }

  @ApiNoContentResponse({
    description: 'User successfully removed from department',
  })
  @ApiNotFoundResponse({
    description: 'Organization does not exist',
  })
  @ApiParam({ name: 'organizationProfileId' })
  @HttpCode(204)
  @Delete('/organization-profiles/:organizationProfileId/user-departments')
  async removeUserFromDepartment(
    @Param('organizationProfileId') organizationProfileId: number,
    @Body() RemoveDepartmentDto: RemoveDepartmentDto,
  ): Promise<void> {
    await this.userDepartmentsService.removeUserFromDepartment(
      organizationProfileId,
      RemoveDepartmentDto.department,
    );
  }

  @ApiNoContentResponse({
    description: 'User role inside department has been changed',
  })
  @ApiNotFoundResponse({
    description: 'User does not belond to department',
  })
  @ApiParam({ name: 'userDepartmentId' })
  @HttpCode(204)
  @Patch('/user-departments/:userDepartmentId/change-role')
  async changeDepartmentRole(
    @Param('userDepartmentId') userDepartmentId: number,
    @Body() changeDepartmentRoleDto: ChangeDepartmentRoleDto,
  ): Promise<void> {
    await this.userDepartmentsService.changeDepartmentRole(
      userDepartmentId,
      changeDepartmentRoleDto.role,
    );
  }
}
