import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from './user.entity';

export class UsersListEntity {
  @ApiProperty({
    description: 'Users list',
    type: UserEntity,
    isArray: true,
  })
  users: UserEntity[];

  @ApiProperty({
    description: 'Number of users',
    type: Number,
    example: 10,
  })
  numberOfUsers: number;
}
