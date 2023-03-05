import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, Min } from 'class-validator';

export enum OrderDirection {
  ASC = 'asc',
  DESC = 'desc',
}

export class CommonQueryDto {
  @ApiPropertyOptional({
    description: 'Order direction',
    enum: OrderDirection,
    default: OrderDirection.ASC,
  })
  @IsEnum(OrderDirection)
  @IsOptional()
  orderDirection?: OrderDirection;

  @ApiProperty({ description: 'Page size', type: Number })
  @IsNumber()
  @IsNotEmpty()
  @Transform(({ value }) => parseInt(value))
  @Min(1)
  pageSize: number;

  @ApiProperty({ description: 'Current page', type: Number })
  @IsNumber()
  @IsNotEmpty()
  @Transform(({ value }) => parseInt(value))
  @Min(1)
  page: number;
}
