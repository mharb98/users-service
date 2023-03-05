import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class VerificationTokenDto {
  @ApiProperty({
    description: 'Token used to verify the user email',
    type: Number,
    example: 123456,
  })
  @IsNumber()
  @IsNotEmpty()
  //   @Transform(({ value }) => parseInt(value))
  token: number;
}
