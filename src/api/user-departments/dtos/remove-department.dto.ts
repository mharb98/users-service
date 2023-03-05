import { ApiProperty } from '@nestjs/swagger';
import { Department } from '@prisma/client';
import { IsEnum, IsNotEmpty } from 'class-validator';

export class RemoveDepartmentDto {
  @ApiProperty({
    description: 'Department from which a user should be removed',
    enum: Department,
    example: Department.Finance,
  })
  @IsNotEmpty()
  @IsEnum(Department)
  department: Department;
}
