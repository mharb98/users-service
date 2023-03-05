import { Inject, Injectable } from '@nestjs/common';
import { Department, DepartmentRole } from '@prisma/client';
import { AddDepartmentDto } from './dtos/add-department.dto';
import { UserDepartmentsRepository } from './repositories/user-departments-repository.interface';

@Injectable()
export class UserDepartmentsService {
  constructor(
    @Inject('UserDepartmentsRepository')
    private repository: UserDepartmentsRepository,
  ) {}

  async addUserToDepartment(
    organizationProfileId: number,
    addDepartmentDto: AddDepartmentDto,
  ): Promise<void> {
    await this.repository.create({
      organizationProfileId: organizationProfileId,
      ...addDepartmentDto,
    });
  }

  async removeUserFromDepartment(
    organizationProfileId: number,
    department: Department,
  ): Promise<void> {
    await this.repository.delete({
      organizationProfileId: organizationProfileId,
      department: department,
    });
  }

  async changeDepartmentRole(
    userDepartmentId: number,
    role: DepartmentRole,
  ): Promise<void> {}
}
