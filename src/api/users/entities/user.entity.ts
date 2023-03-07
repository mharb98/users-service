import { ApiProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class UserEntity implements User {
  @ApiProperty({ description: 'User ID', type: Number, example: 1 })
  id: number;

  @ApiProperty({
    description: 'User Email',
    type: String,
    example: 'johndoe@example.com',
  })
  email: string;

  @ApiProperty({
    description: 'User Name',
    type: String,
    example: 'John Doe',
  })
  name: string;

  @ApiProperty({
    description: 'User Phone',
    type: String,
    example: '+201010101010',
  })
  phone: string;

  @Exclude()
  password: string;

  @ApiProperty({
    description: 'Platform ban status for user',
    type: Boolean,
    example: false,
  })
  platformBan: boolean;

  @ApiProperty({
    description: 'Email verified status for user',
    type: Boolean,
    example: false,
  })
  verified: boolean;

  @ApiProperty({
    description: 'User confirmed status for user',
    type: Boolean,
    example: false,
  })
  confirmed: boolean;

  @ApiProperty({
    description: 'Creation date of the user',
    type: Date,
    example: new Date(),
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Last update date of the user',
    type: Date,
    example: new Date(),
  })
  updatedAt: Date;
}
