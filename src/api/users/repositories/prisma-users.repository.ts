import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PaginationInput } from '../../../common/interfaces/pagination-input.interface';
import { PrismaService } from '../../../prisma/prisma.service';
import { UserEntity } from '../entities/user.entity';
import { CreateUserInput } from '../interfaces/create-user-input.interface';
import { FindManyUserInput } from '../interfaces/find-many-user-input.interface';
import { FindUniqueUserInput } from '../interfaces/find-unique-user-input.interface';
import { SortUsersInput } from '../interfaces/sort-users-input.interface';
import { UpdateUserInput } from '../interfaces/update-user-input.interface';
import { UsersRepositoryInterface } from './users-repository.interface';
import { UsersSerializer } from '../serializers/users.serializer';

@Injectable()
export class PrismaUsers implements UsersRepositoryInterface {
  constructor(private prisma: PrismaService) {}

  async create(createUserInput: CreateUserInput): Promise<UserEntity> {
    try {
      return await this.prisma.user.create({
        data: createUserInput,
        select: UsersSerializer,
      });
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ConflictException('User already exists');
      }

      throw new InternalServerErrorException('Could not create user');
    }
  }

  async update(
    findUniqueUserInput: FindUniqueUserInput,
    updateUserInput: UpdateUserInput,
  ): Promise<UserEntity> {
    try {
      return await this.prisma.user.update({
        where: findUniqueUserInput,
        data: updateUserInput,
        select: UsersSerializer,
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException('Could not find user');
      }

      throw new InternalServerErrorException('Could not update the user');
    }
  }

  async findUnique(
    findUniqueUserInput: FindUniqueUserInput,
  ): Promise<UserEntity> {
    try {
      return await this.prisma.user.findUniqueOrThrow({
        where: findUniqueUserInput,
        select: UsersSerializer,
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException('Could not find user');
      }

      throw new InternalServerErrorException('Could not get user');
    }
  }

  async findMany(
    findManyUserInput: FindManyUserInput,
    paginationInput: PaginationInput,
    sortUsersInput: SortUsersInput,
  ): Promise<UserEntity[]> {
    const queryObject: Prisma.UserWhereInput = {
      name: { contains: findManyUserInput.name, mode: 'insensitive' },
      email: { contains: findManyUserInput.email, mode: 'insensitive' },
      phone: findManyUserInput.phone,
      platformBan: findManyUserInput.platformBan,
      verified: findManyUserInput.verified,
    };

    try {
      return await this.prisma.user.findMany({
        where: queryObject,
        skip: paginationInput.page - 1,
        take: paginationInput.pageSize * paginationInput.page,
        select: UsersSerializer,
        // orderBy: sortUsersInput,
      });
    } catch (error) {
      throw new InternalServerErrorException('Could not get users');
    }
  }

  async count(findManyUserInput: FindManyUserInput): Promise<number> {
    const queryObject: Prisma.UserWhereInput = {
      name: { contains: findManyUserInput.name, mode: 'insensitive' },
      email: { contains: findManyUserInput.email, mode: 'insensitive' },
      phone: findManyUserInput.phone,
      platformBan: findManyUserInput.platformBan,
      verified: findManyUserInput.verified,
    };

    try {
      return await this.prisma.user.count({
        where: queryObject,
      });
    } catch (error) {
      throw new InternalServerErrorException('Could not get users');
    }
  }
}
