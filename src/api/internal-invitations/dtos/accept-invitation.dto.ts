import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsNumber } from 'class-validator';

export class AcceptInvitationDto {
  @ApiProperty({
    type: String,
    description: 'Email to which the invitation is associated',
    example: 'johndoe@example.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    type: Number,
    description: 'Token that is sent before over email',
    example: 123456,
  })
  @IsNumber()
  @IsNotEmpty()
  token: number;
}
