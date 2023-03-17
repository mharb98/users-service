import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { UsersProducersModule } from '../../users-producers/users-producers.module';
import { InternalRolesController } from './internal-roles.controller';
import { InternalRolesService } from './internal-roles.service';
import { PrismaInternalRoles } from './repositories/prisma-internal-roles.repository';

@Module({
  imports: [PrismaModule, UsersProducersModule],
  controllers: [InternalRolesController],
  providers: [
    InternalRolesService,
    {
      provide: 'InternalRolesRepository',
      useClass: PrismaInternalRoles,
    },
  ],
})
export class InternalRolesModule {}
