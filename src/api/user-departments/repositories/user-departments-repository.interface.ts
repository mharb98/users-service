import { Department } from '@prisma/client';
import { UserDepartmentEntity } from '../entites/user-department.entity';
import { CreateUserDepartmentInput } from '../interfaces/create-user-department-input.interface';
import { DeleteUserDepartmentInput } from '../interfaces/delete-user-department-input.interface';
import { UpdateUserDepartmentInput } from '../interfaces/update-user-department-input.interface';

export interface UserDepartmentsRepository {
  create(
    createUserDepartmentInput: CreateUserDepartmentInput,
  ): Promise<UserDepartmentEntity>;

  delete(deleteUserDepartmentInput: DeleteUserDepartmentInput): Promise<void>;

  update(
    userDepartmentId: number,
    UpdateUserDepartmentInput: UpdateUserDepartmentInput,
  ): Promise<UserDepartmentEntity>;
}
