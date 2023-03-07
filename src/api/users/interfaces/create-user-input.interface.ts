export interface CreateUserInput {
  email: string;
  password: string;
  name?: string;
  phone?: string;
  verified?: boolean;
  confirmed?: boolean;
}
