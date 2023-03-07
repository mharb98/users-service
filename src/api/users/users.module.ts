import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { CommonModule } from '../../common/common.module';
import { PrismaModule } from '../../prisma/prisma.module';
import { PrismaUsers } from './repositories/prisma-users.repository';
import { UsersUnitOfWork } from './repositories/users.unit-of-work';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [
    PrismaModule,
    CommonModule,
    BullModule.registerQueue({
      name: 'mailing-queue',
    }),
  ],
  controllers: [UsersController],
  providers: [
    UsersService,
    {
      provide: 'UsersRepository',
      useClass: PrismaUsers,
    },
    UsersUnitOfWork,
  ],
})
export class UsersModule {}
