import { Department, DepartmentRole } from '@prisma/client';

export interface CreateOrganizationInvitationInput {
  email: string;
  department: Department;
  role: DepartmentRole;
  organizationId: number;
}
