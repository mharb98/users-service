import { ApiProperty } from '@nestjs/swagger';
import { OrganizationProfile, UserDepartment } from '@prisma/client';
import { UserEntity } from '../../users/entities/user.entity';

export class OrganizationProfileEntity implements OrganizationProfile {
  @ApiProperty({
    type: Number,
    description: 'ID of the organization user entity',
    example: 1,
  })
  id: number;

  @ApiProperty({
    type: Boolean,
    description: 'Status of the organization user',
    example: false,
  })
  banned: boolean;

  @ApiProperty({
    type: Date,
    description: 'Creation date of organization user',
    example: new Date(),
  })
  createdAt: Date;

  @ApiProperty({
    type: Date,
    description: 'Last update date of organization user',
    example: new Date(),
  })
  updatedAt: Date;

  @ApiProperty({
    type: Number,
    description: 'ID of the user in the organization',
    example: 1,
  })
  userId: number;

  @ApiProperty({
    type: Number,
    description: 'Organization to which the user belongs',
    example: 1,
  })
  organizationId: number;

  @ApiProperty({
    description: 'User entity associated with organization profile',
    type: UserEntity,
  })
  user?: UserEntity;

  @ApiProperty({
    description: 'List of departments of user inside the organization',
    isArray: true,
  })
  departments?: UserDepartment[];
}
