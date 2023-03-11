import { ApiProperty } from '@nestjs/swagger';
import { Gender, SocialProfile } from '@prisma/client';
import { UserEntity } from '../../users/entities/user.entity';

export class SocialProfileEntity implements SocialProfile {
  @ApiProperty({
    type: Number,
    description: 'ID of user associated social profile',
    example: 1,
  })
  id: number;

  @ApiProperty({
    type: Boolean,
    description: 'Status of user to access his social profile details',
    example: false,
  })
  banned: boolean;

  @ApiProperty({
    enum: Gender,
    description: 'Gender of user',
    example: Gender.Female,
  })
  gender: Gender;

  @ApiProperty({
    type: Date,
    description: 'Creation date of social profile for user',
    example: new Date(),
  })
  createdAt: Date;

  @ApiProperty({
    type: Date,
    description: 'Last update date of social profile for user',
    example: new Date(),
  })
  updatedAt: Date;

  @ApiProperty({
    type: Number,
    description: 'ID of user associated with the social profile',
    example: 1,
  })
  userId: number;

  @ApiProperty({
    type: UserEntity,
    description: 'User associated with the profile',
  })
  user?: UserEntity;
}
