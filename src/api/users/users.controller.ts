import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { QueryUsersDto } from './dtos/query-users.dto';
import { RegisterUserDto } from './dtos/register-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { VerificationTokenDto } from './dtos/verification-token.dto';
import { UserEntity } from './entities/user.entity';
import { UsersListEntity } from './entities/users-list.entity';
import { UsersService } from './users.service';

@ApiTags('Users')
@Controller('api/users')
@UseInterceptors(ClassSerializerInterceptor)
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiOperation({
    description: 'Registers users into the charity app platform',
    summary:
      "Taes in an email, a name, a password, and optionally a phone number to register a user, A user can't sign up with an existing email",
  })
  @ApiCreatedResponse({
    description: 'User has been created successfully',
    type: UserEntity,
  })
  @ApiConflictResponse({ description: 'User already exists' })
  @Post()
  async registerUser(@Body() registerUserDto: RegisterUserDto): Promise<any> {
    // return 'Marwan';
    return await this.usersService.registerUser(registerUserDto);
  }

  @ApiOperation({
    description: 'Updates users fields',
    summary: 'Takes an optional name or phone number to update the user',
  })
  @ApiOkResponse({
    description: 'User has been updated successfully',
    type: UserEntity,
  })
  @ApiNotFoundResponse({ description: 'Could not find user' })
  @Patch(':userId')
  async updateUser(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserEntity> {
    return await this.usersService.updateUser(userId, updateUserDto);
  }

  @ApiOperation({
    description: 'Returns a user object for the specified id',
    summary: 'Takes a user id parameter and returns the corresponding user',
  })
  @ApiOkResponse({ description: 'Returns a user object', type: UserEntity })
  @ApiNotFoundResponse({ description: 'Could not find user' })
  @Get(':userId')
  async getUser(
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<UserEntity> {
    return await this.usersService.findUserById(userId);
  }

  @ApiOperation({
    description: 'Returns a list of queried users',
    summary:
      'Takes in optional parameters for users and returns a list with the queried users',
  })
  @ApiOkResponse({
    description: 'Returns a list of users',
    type: UsersListEntity,
  })
  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  async queryUsers(@Query() query: QueryUsersDto): Promise<UsersListEntity> {
    return await this.usersService.queryUsers(query);
  }

  @ApiOperation({
    description: 'Changes user activity',
    summary: 'Toggles user activity ',
  })
  @ApiOkResponse({
    description: 'User activity has been changed successfully',
    type: UserEntity,
  })
  @ApiNotFoundResponse({ description: 'Could not find user' })
  @Patch(':userId/toggle-user-activity')
  async toggleUserActivity(
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<UserEntity> {
    return await this.usersService.toggleUserActivity(userId);
  }

  @ApiOperation({
    description: 'Verify user account',
    summary:
      'Takes a user id and verification token and checks if token is valid',
  })
  @ApiNoContentResponse({ description: 'Account verified successfully' })
  @ApiNotFoundResponse({ description: 'Could not find specified user' })
  @ApiBadRequestResponse({ description: 'Verification token is not correct' })
  @Patch(':email/verify-accout')
  async verifyAccount(
    @Param('email') email: string,
    @Body() verificationTokenDto: VerificationTokenDto,
  ): Promise<void> {
    await this.usersService.verifyAccount(email, verificationTokenDto.token);
  }

  @Post(':email/resend-verification-token')
  async resendVerificationTokne(@Param('email') email: string): Promise<void> {
    await this.usersService.resendVerificationToken(email);
  }
}
