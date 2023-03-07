import { ApiProperty } from '@nestjs/swagger';
import { Department, DepartmentRole, UserDepartment } from '@prisma/client';

export class UserDepartmentEntity implements UserDepartment {
  @ApiProperty({
    description: 'ID of user department',
    example: 1,
    type: Number,
  })
  id: number;

  @ApiProperty({
    description:
      'ID of Organization Profile that the department will be associated with',
    example: 1,
    type: Number,
  })
  organizationProfileId: number;

  @ApiProperty({
    description: 'Department to which the  user belongs',
    enum: Department,
    example: Department.Warehouse,
  })
  department: Department;

  @ApiProperty({
    description: 'Role of user inside the department',
    enum: DepartmentRole,
    example: DepartmentRole.Member,
  })
  role: DepartmentRole;
}
