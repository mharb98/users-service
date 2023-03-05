import { ApiProperty } from '@nestjs/swagger';
import { InternalRole } from '@prisma/client';

export class InternalInvitationDto {
  @ApiProperty({
    type: String,
    example: 'johndoe@example.com',
    description: 'Email of the user that needs to be invited',
  })
  email: string;

  @ApiProperty({
    enum: InternalRole,
    description: 'Initial role added to user after accepting the invitation',
    example: InternalRole.Member,
    default: InternalRole.Member,
  })
  role: InternalRole;
}
