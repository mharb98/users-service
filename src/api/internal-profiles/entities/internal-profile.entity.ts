import { ApiProperty } from '@nestjs/swagger';
import { InternalProfile } from '@prisma/client';
import { InternalRoleEntity } from '../../internal-roles/entities/internal-role.entity';
import { UserEntity } from '../../users/entities/user.entity';

export class InternalProfileEntity implements InternalProfile {
  @ApiProperty({
    description: 'Internal profile entity id',
    type: Number,
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'Internal user ban',
    type: Boolean,
    example: false,
  })
  banned: boolean;

  @ApiProperty({
    description: 'Creation date of internal profile',
    type: Date,
    example: new Date(),
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Last update date of internal profile',
    type: Date,
    example: new Date(),
  })
  updatedAt: Date;

  @ApiProperty({
    description: 'ID of user associated with the profile',
    type: Number,
    example: 1,
  })
  userId: number;

  @ApiProperty({
    description: 'Roles associated with a user',
    type: InternalRoleEntity,
    isArray: true,
  })
  roles?: InternalRoleEntity[];

  @ApiProperty({
    description: 'Roles associated with a user',
    type: UserEntity,
  })
  user?: UserEntity;
}
