import { ApiProperty } from '@nestjs/swagger';
import { Department, DepartmentRole } from '@prisma/client';
import { IsEmail, IsEnum, IsNotEmpty } from 'class-validator';

export class OrganizationInvitationDto {
  @ApiProperty({
    type: String,
    example: 'johndoe@example.com',
    description: 'Email to which invitation should be sent',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    enum: Department,
    example: Department.CustomerService,
    description: 'Department to which a user will be added',
  })
  @IsEnum(Department)
  @IsNotEmpty()
  department: Department;

  @ApiProperty({
    enum: DepartmentRole,
    example: DepartmentRole.Member,
    description: 'User role inside the department he will be added to',
  })
  @IsEnum(DepartmentRole)
  @IsNotEmpty()
  role: DepartmentRole;
}
