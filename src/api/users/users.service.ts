import {
  BadRequestException,
  CACHE_MANAGER,
  Inject,
  Injectable,
} from '@nestjs/common';
import { PasswordService } from '../../common/hashing/password.service';
import { QueryUsersDto } from './dtos/query-users.dto';
import { RegisterUserDto } from './dtos/register-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { UsersListEntity } from './entities/users-list.entity';
import { Cache } from 'cache-manager';
import { RngService } from '../../common/rng/rng.service';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { UsersRepositoryInterface } from './repositories/users-repository.interface';
import { UsersUnitOfWork } from './repositories/users.unit-of-work';

@Injectable()
export class UsersService {
  constructor(
    private passwordService: PasswordService,
    private usersUoW: UsersUnitOfWork,
    private rngService: RngService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    @Inject('UsersRepository')
    private usersRepository: UsersRepositoryInterface,
    @InjectQueue('mailing-queue')
    private mailingQueue: Queue,
  ) {}

  async registerUser(registerUserDto: RegisterUserDto): Promise<any> {
    const password = await this.passwordService.hashPassword(
      registerUserDto.password,
    );

    const user: UserEntity = await this.usersUoW.createSocialProfile(
      registerUserDto,
      password,
    );

    const verificationToken: number = this.rngService.generateRandomToken();

    await this.cacheManager.set(
      `${registerUserDto.email}-verification-token`,
      verificationToken,
      0,
    );

    await this.mailingQueue.add('verification-mail', {
      email: registerUserDto.email,
      token: verificationToken,
    });
    // return 'Emad';

    return user;
  }

  async updateUser(
    userId: number,
    updateUserDto: UpdateUserDto,
  ): Promise<UserEntity> {
    const user: UserEntity = await this.usersRepository.update(
      {
        id: userId,
      },
      {
        ...updateUserDto,
      },
    );

    delete user.password;

    return user;
  }

  async findUserById(userId: number): Promise<UserEntity> {
    const user: UserEntity = await this.usersRepository.findUnique({
      id: userId,
    });

    delete user.password;

    return user;
  }

  async queryUsers(query: QueryUsersDto): Promise<UsersListEntity> {
    const users: UserEntity[] = await this.usersRepository.findMany(
      { ...query },
      { page: query.page, pageSize: query.pageSize },
      { id: query.orderDirection },
    );

    const usersCount: number = await this.usersRepository.count({
      ...query,
    });

    return {
      users,
      numberOfUsers: usersCount,
    };
  }

  async toggleUserActivity(userId: number): Promise<UserEntity> {
    let user: UserEntity = await this.findUserById(userId);

    user = await this.usersRepository.update(
      {
        id: userId,
      },
      {
        platformBan: !user.platformBan,
      },
    );

    return user;
  }

  async verifyAccount(email: string, token: number): Promise<void> {
    await this.checkUserVerificationToken(email, token);

    await this.usersRepository.update(
      {
        email: email,
      },
      {
        verified: true,
      },
    );
  }

  async resendVerificationToken(email: string): Promise<void> {
    const verificationToken = this.rngService.generateRandomToken();

    const user: UserEntity = await this.usersRepository.findUnique({ email });

    if (user && user.verified) {
      throw new BadRequestException('User has already been verified');
    }

    await this.cacheManager.set(
      `${email}-verification-token`,
      verificationToken,
      0,
    );

    await this.mailingQueue.add('verification-mail', {
      email: email,
      token: verificationToken,
    });
  }

  private async checkUserVerificationToken(
    email: string,
    token: number,
  ): Promise<void> {
    const cachedToken = await this.cacheManager.get(
      `${email}-verification-token`,
    );

    if (!cachedToken) {
      throw new BadRequestException('Verification token has expired');
    }

    if (token != cachedToken) {
      throw new BadRequestException('Invalid verification token');
    }
  }
}
