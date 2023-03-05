import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Department } from '@prisma/client';
import { PrismaService } from '../../../prisma/prisma.service';
import { UserDepartmentEntity } from '../entites/user-department.entity';
import { CreateUserDepartmentInput } from '../interfaces/create-user-department-input.interface';
import { DeleteUserDepartmentInput } from '../interfaces/delete-user-department-input.interface';
import { UpdateUserDepartmentInput } from '../interfaces/update-user-department-input.interface';
import { UserDepartmentsRepository } from './user-departments-repository.interface';

@Injectable()
export class PrismaUserDepartments implements UserDepartmentsRepository {
  constructor(private prisma: PrismaService) {}
  async create(
    createUserDepartmentInput: CreateUserDepartmentInput,
  ): Promise<UserDepartmentEntity> {
    try {
      return await this.prisma.userDepartment.create({
        data: createUserDepartmentInput,
      });
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ConflictException('User already belongs to the department');
      }
    }
  }

  async delete(
    deleteUserDepartmentInput: DeleteUserDepartmentInput,
  ): Promise<void> {
    try {
      await this.prisma.userDepartment.delete({
        where: {
          department_organizationProfileId: {
            organizationProfileId:
              deleteUserDepartmentInput.organizationProfileId,
            department: deleteUserDepartmentInput.department,
          },
        },
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException('User department could not be found');
      }
    }
  }

  async update(
    organizationProfileId: number,
    department: Department,
    updateUserDepartmentInput: UpdateUserDepartmentInput,
  ): Promise<UserDepartmentEntity> {
    try {
      return await this.prisma.userDepartment.update({
        where: {
          department_organizationProfileId: {
            organizationProfileId: organizationProfileId,
            department: department,
          },
        },
        data: {
          role: updateUserDepartmentInput.role,
        },
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException('User department could not be found');
      }
    }
  }
}
