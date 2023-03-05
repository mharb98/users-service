import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { PrismaUserDepartments } from './repositories/prisma-user-departments.repository';
import { UserDepartmentsController } from './user-departments.controller';
import { UserDepartmentsService } from './user-departments.service';

@Module({
  imports: [PrismaModule],
  controllers: [UserDepartmentsController],
  providers: [
    UserDepartmentsService,
    {
      provide: 'UserDepartmentsRepository',
      useClass: PrismaUserDepartments,
    },
  ],
})
export class UserDepartmentsModule {}
