import { ApiProperty } from '@nestjs/swagger';
import { DepartmentRole } from '@prisma/client';
import { IsNotEmpty, IsEnum } from 'class-validator';

export class ChangeDepartmentRoleDto {
  @ApiProperty({
    description: 'Role of user inside department',
    enum: DepartmentRole,
    example: DepartmentRole.Member,
  })
  @IsNotEmpty()
  @IsEnum(DepartmentRole)
  role: DepartmentRole;
}
