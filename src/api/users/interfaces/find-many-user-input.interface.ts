export interface FindManyUserInput {
  id?: number;
  name?: string;
  email?: string;
  phone?: string;
  platformBan?: boolean;
  verified?: boolean;
  confirmed?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
