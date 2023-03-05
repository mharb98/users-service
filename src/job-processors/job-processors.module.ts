import { Module } from '@nestjs/common';
import { MailingQueue } from './mailing.processor';

@Module({
  providers: [MailingQueue],
})
export class JobProcessorsModule {}
