import { ApiProperty } from '@nestjs/swagger';
import { Organization } from '@prisma/client';

export class OrganizationEntity implements Organization {
  @ApiProperty({ type: Number, description: 'ID of organization', example: 1 })
  id: number;

  @ApiProperty({
    type: String,
    description: 'Name of organization',
    example: 'Organization Name',
  })
  name: string;
}
