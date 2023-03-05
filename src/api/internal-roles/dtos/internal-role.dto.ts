import { ApiProperty } from '@nestjs/swagger';
import { InternalRole } from '@prisma/client';
import { IsEnum, IsNotEmpty } from 'class-validator';

export class InternalRoleDto {
  @ApiProperty({
    description: 'Role needed to be added',
    enum: InternalRole,
    example: InternalRole.Member,
  })
  @IsEnum(InternalRole)
  @IsNotEmpty()
  role: InternalRole;
}
