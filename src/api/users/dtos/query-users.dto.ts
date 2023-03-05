import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsBoolean, IsEnum, IsOptional, IsString } from 'class-validator';
import { CommonQueryDto } from '../../../common/dtos/common-query.dto';

export enum UsersFields {
  id,
  name,
  phone,
  platformBan,
  verified,
  createdAt,
  updatedAt,
}

export class QueryUsersDto extends CommonQueryDto {
  @ApiPropertyOptional({
    description: 'User Name',
    type: String,
  })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiPropertyOptional({
    description: 'User Phone',
    type: String,
  })
  @IsString()
  @IsOptional()
  phone?: string;

  @ApiPropertyOptional({
    description: 'User Email',
    type: String,
  })
  @IsString()
  @IsOptional()
  email?: string;

  @ApiPropertyOptional({
    description: 'User Platform Ban',
    type: Boolean,
  })
  @IsBoolean()
  @Transform(({ value }) =>
    value === 'true' ? true : value === 'false' ? false : null,
  )
  @IsOptional()
  platformBan?: boolean;

  @ApiPropertyOptional({ description: 'User verified', type: Boolean })
  @IsBoolean()
  @Transform(({ value }) =>
    value === 'true' ? true : value === 'false' ? false : null,
  )
  @IsOptional()
  verified?: boolean;

  @ApiPropertyOptional({
    description: 'Order by direction',
    enum: UsersFields,
    default: UsersFields.id,
  })
  @IsOptional()
  @IsEnum(UsersFields)
  orderyBy: UsersFields;
}
