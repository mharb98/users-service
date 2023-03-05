import { Department } from '@prisma/client';

export interface DeleteUserDepartmentInput {
  organizationProfileId: number;
  department: Department;
}
