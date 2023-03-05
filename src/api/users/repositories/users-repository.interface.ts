import { PaginationInput } from '../../../common/interfaces/pagination-input.interface';
import { UserEntity } from '../entities/user.entity';
import { CreateUserInput } from '../interfaces/create-user-input.interface';
import { FindManyUserInput } from '../interfaces/find-many-user-input.interface';
import { FindUniqueUserInput } from '../interfaces/find-unique-user-input.interface';
import { SortUsersInput } from '../interfaces/sort-users-input.interface';
import { UpdateUserInput } from '../interfaces/update-user-input.interface';

export interface UsersRepositoryInterface {
  create(createUserInput: CreateUserInput): Promise<UserEntity>;
  update(
    findUniqueUserInput: FindUniqueUserInput,
    updateUserInput: UpdateUserInput,
  ): Promise<UserEntity>;
  findUnique(findUniqueUserInput: FindUniqueUserInput): Promise<UserEntity>;
  findMany(
    findManyUserInput: FindManyUserInput,
    paginationInput: PaginationInput,
    sortUsersInput: any,
  ): Promise<UserEntity[]>;
  count(findManyUserInput: FindManyUserInput): Promise<number>;
}
