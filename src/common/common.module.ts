import { Module } from '@nestjs/common';
import { PasswordService } from './hashing/password.service';
import { RngService } from './rng/rng.service';

@Module({
  providers: [PasswordService, RngService],
  exports: [PasswordService, RngService],
})
export class CommonModule {}
