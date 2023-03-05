import { Gender } from '@prisma/client';

export interface CreateUserInput {
  email: string;
  password: string;
  name?: string;
  phone?: string;
  gender: Gender;
  verified?: boolean;
  confirmed?: boolean;
}
