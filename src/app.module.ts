import { CacheModule, CacheStore, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ApiModule } from './api/api.module';
import { CommonModule } from './common/common.module';
import { redisStore } from 'cache-manager-redis-store';
import { BullModule } from '@nestjs/bull';
import { JobProcessorsModule } from './job-processors/job-processors.module';
import { InternalInvitationsModule } from './api/internal-invitations/internal-invitations.module';
import { OrganizationsModule } from './organizations/organizations.module';

@Module({
  imports: [
    PrismaModule,
    ApiModule,
    CommonModule,
    CacheModule.register({
      isGlobal: true,
      store: redisStore as unknown as CacheStore,
      socket: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
      },
    }),
    BullModule.forRoot({
      redis: {
        host: process.env.REDIS_HOST,
        port: parseInt(process.env.REDIS_PORT),
      },
    }),
    BullModule.registerQueue({
      name: 'mailing-queue',
    }),
    JobProcessorsModule,
    InternalInvitationsModule,
    OrganizationsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
