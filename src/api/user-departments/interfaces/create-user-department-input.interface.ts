import { Department, DepartmentRole } from '@prisma/client';

export interface CreateUserDepartmentInput {
  organizationProfileId: number;
  department: Department;
  role: DepartmentRole;
}
