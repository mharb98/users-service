import { ApiProperty } from '@nestjs/swagger';

export class AcceptInvitationDto {
  @ApiProperty({
    type: String,
    description: 'Email of the invited user',
    example: 'johndoe@example.com',
  })
  email: string;

  @ApiProperty({
    type: Number,
    description: 'Token associated with the invitation',
    example: 123456,
  })
  token: number;
}
