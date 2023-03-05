import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  @ApiPropertyOptional({
    description: 'User Name',
    type: String,
    example: 'John Doe',
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({
    description: 'User Phone',
    type: String,
    example: '+201010101010',
  })
  @IsOptional()
  @IsString()
  phone?: string;
}
