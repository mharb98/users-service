import { Processor, Process, OnQueueActive } from '@nestjs/bull';
import { Job } from 'bull';
import { InvitationMailData } from './QueueData/invitation-mail.interface';
import { PasswordMailData } from './QueueData/password-mail.interface';
import { VerificationMailData } from './QueueData/verification-mail.interface';

@Processor('mailing-queue')
export class MailingQueue {
  @OnQueueActive()
  onActive(job: Job) {
    console.log(
      `Processing job ${job.id} of type ${job.name} with data ${job.data}...`,
    );
  }

  @Process('verification-mail')
  async verificationMail(job: Job<VerificationMailData>) {
    const data = job.data;
    console.log(
      `Sending a verification token to ${data.email} with value ${data.token}`,
    );
    return {};
  }

  @Process('internal-invitation-mail')
  async internalInvitationMail(job: Job<InvitationMailData>) {
    const data = job.data;
    console.log(
      `Sending an internal invitation token to ${data.email} with value ${data.token}`,
    );
    return {};
  }

  @Process('organization-invitation-mail')
  async organizationInvitationMail(job: Job<InvitationMailData>) {
    const data = job.data;
    console.log(
      `Sending an organization invitation token to ${data.email} with value ${data.token}`,
    );
    return {};
  }

  @Process('password-mail')
  async passwordMail(job: Job<PasswordMailData>) {
    const data = job.data;
    console.log(
      `Sending an email to ${data.email} with the new password for unconfirmed user ${data.password}`,
    );
    return {};
  }
}
