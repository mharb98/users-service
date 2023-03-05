import { ApiProperty } from '@nestjs/swagger';
import {
  Department,
  DepartmentRole,
  OrganizationInvitation,
} from '@prisma/client';

export class OrganizationInvitationEntity implements OrganizationInvitation {
  @ApiProperty({
    type: Number,
    example: 1,
    description: 'ID of the organization invitation',
  })
  id: number;

  @ApiProperty({
    type: String,
    example: 'johndoe@example.com',
    description: 'Email for the invited user',
  })
  email: string;

  @ApiProperty({
    enum: Department,
    example: Department.Administration,
    description: 'Department to which the user will be added',
  })
  department: Department;

  @ApiProperty({
    enum: DepartmentRole,
    example: DepartmentRole.Member,
    description: 'Role to which user will be given',
  })
  role: DepartmentRole;

  @ApiProperty({
    type: Number,
    example: 1,
    description: 'ID of the organization associated with the invitation',
  })
  organizationId: number;

  @ApiProperty({
    type: Date,
    example: new Date(),
    description: 'Acceptance date of the invitation',
  })
  acceptedAt: Date;

  @ApiProperty({
    type: Date,
    example: new Date(),
    description: 'Creation date of the invitation',
  })
  createdAt: Date;

  @ApiProperty({
    type: Date,
    example: new Date(),
    description: 'Last update date of the invitation',
  })
  updatedAt: Date;
}
