import { ApiProperty } from '@nestjs/swagger';
import { InternalRole, InternalRoles } from '@prisma/client';
import { InternalProfileEntity } from '../../internal-profiles/entities/internal-profile.entity';

export class InternalRoleEntity implements InternalRoles {
  @ApiProperty({
    type: Number,
    description: 'ID of user profile to which the role is added',
    example: 1,
  })
  internalProfileId: number;

  @ApiProperty({
    enum: InternalRole,
    description: 'Name of the internal role added to user',
    example: 'Admin',
  })
  role: InternalRole;

  internalProfile?: InternalProfileEntity;
}
