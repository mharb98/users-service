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
import { BrokersModule } from './Brokers/brokers.module';
import { TestConsumer } from './test.consumer';
import { ConfigModule } from '@nestjs/config';

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
    ConfigModule.forRoot({ isGlobal: true }),
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
    BrokersModule,
  ],
  controllers: [AppController],
  providers: [AppService, TestConsumer],
})
export class AppModule {}
