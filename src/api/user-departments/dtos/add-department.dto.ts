import { ApiProperty } from '@nestjs/swagger';
import { Department, DepartmentRole } from '@prisma/client';
import { IsEnum, IsNotEmpty } from 'class-validator';

export class AddDepartmentDto {
  @ApiProperty({
    description: 'Department to which user should be added',
    enum: Department,
    example: Department.Administration,
  })
  @IsNotEmpty()
  @IsEnum(Department)
  department: Department;

  @ApiProperty({
    description: 'Role that user will have inside the department',
    enum: DepartmentRole,
    example: DepartmentRole.Member,
  })
  @IsNotEmpty()
  @IsEnum(DepartmentRole)
  role: DepartmentRole;
}
