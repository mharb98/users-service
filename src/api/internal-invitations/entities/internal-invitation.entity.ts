import { ApiProperty } from '@nestjs/swagger';
import { InternalInvitation, InternalRole } from '@prisma/client';

export class InternalInvitationEntity implements InternalInvitation {
  @ApiProperty({
    description: 'Invitation ID',
    type: Number,
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'Invitation email',
    type: String,
    example: 'johndoe@example.com',
  })
  email: string;

  @ApiProperty({
    description: 'Invitation role',
    type: InternalRole,
    example: InternalRole.Member,
  })
  role: InternalRole;

  @ApiProperty({
    description: 'Invitation accepted at time',
    type: Date,
    example: new Date(),
  })
  acceptedAt: Date;

  @ApiProperty({
    description: 'Invitation creation data',
    type: Date,
    example: new Date(),
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Invitation last update data',
    type: Date,
    example: new Date(),
  })
  updatedAt: Date;
}
