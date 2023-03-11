import { ApiPropertyOptional } from '@nestjs/swagger';
import { Gender } from '@prisma/client';
import { IsEnum } from 'class-validator';

export class UpdateSocialProfileDto {
  @ApiPropertyOptional({
    description: 'Gender of user',
    enum: Gender,
    example: Gender.Female,
  })
  @IsEnum(Gender)
  gender?: Gender;
}
