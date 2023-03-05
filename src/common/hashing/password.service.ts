import { Injectable } from '@nestjs/common';
import * as argon2 from 'argon2';
import * as generator from 'generate-password';

@Injectable()
export class PasswordService {
  generatePassword(): string {
    return generator.generate({
      length: 10,
      numbers: true,
      symbols: true,
      lowercase: true,
      uppercase: true,
      strict: true,
    });
  }

  async hashPassword(password: string): Promise<string> {
    return await argon2.hash(password);
  }
}
