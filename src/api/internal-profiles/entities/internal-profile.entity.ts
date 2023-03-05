import { ApiProperty } from '@nestjs/swagger';
import { InternalProfile } from '@prisma/client';

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
}
