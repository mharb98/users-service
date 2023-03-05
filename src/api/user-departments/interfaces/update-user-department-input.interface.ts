import { DepartmentRole } from '@prisma/client';

export interface UpdateUserDepartmentInput {
  role: DepartmentRole;
}
