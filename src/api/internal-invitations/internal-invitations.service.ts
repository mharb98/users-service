import {
  BadRequestException,
  CACHE_MANAGER,
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Queue } from 'bull';
import { Cache } from 'cache-manager';
import { InjectQueue } from '@nestjs/bull';
import { InternalRole } from '@prisma/client';
import { RngService } from '../../common/rng/rng.service';
import { InternalInvitationsRepository } from './repositories/internal-invitations-repository.interface';
import { InternalInvitationEntity } from './entities/internal-invitation.entity';
import { InternalInvitationUnitOfWork } from './repositories/internal-invitation.unit-of-work';
import { UserEntity } from '../users/entities/user.entity';
import { PasswordService } from '../../common/hashing/password.service';

@Injectable()
export class InternalInvitationsService {
  constructor(
    private rngService: RngService,
    private internalInvitationUoW: InternalInvitationUnitOfWork,
    private passwordService: PasswordService,
    @Inject('InternalInvitationsRepository')
    private internalInvitationsRepository: InternalInvitationsRepository,
    @Inject(CACHE_MANAGER)
    private cacheManager: Cache,
    @InjectQueue('mailing-queue')
    private mailingQueue: Queue,
  ) {}

  async sendInternalInvitation(
    email: string,
    role: InternalRole,
  ): Promise<string> {
    let invitation: InternalInvitationEntity =
      await this.internalInvitationsRepository.findOne({ email: email });

    if (invitation) {
      if (invitation.acceptedAt) {
        throw new BadRequestException('User is already a member');
      } else {
        throw new ConflictException('User has already been invited');
      }
    }

    invitation = await this.internalInvitationsRepository.create({
      email: email,
      role: role,
    });

    this.createInternalInvitationAndSend(email);

    return 'User has been successfully invited';
  }

  async resendInvitation(invitationId: number): Promise<void> {
    const invitation: InternalInvitationEntity =
      await this.internalInvitationsRepository.findOne({ id: invitationId });

    this.checkInvitation(invitation);

    this.createInternalInvitationAndSend(invitation.email);
  }

  async deleteInvitation(internalInvitationId: number): Promise<void> {
    const invitation: InternalInvitationEntity =
      await this.internalInvitationsRepository.findOne({
        id: internalInvitationId,
      });

    this.checkInvitation(invitation);

    await this.internalInvitationsRepository.delete(internalInvitationId);
  }

  async acceptInvitation(email: string, token: number): Promise<void> {
    const invitation: InternalInvitationEntity =
      await this.internalInvitationsRepository.findOne({
        email: email,
      });

    this.checkInvitation(invitation);

    const cachedToken = await this.cacheManager.get(
      `${email}-internal-invitation-info`,
    );

    if (!cachedToken) {
      throw new BadRequestException('Token has expired');
    }

    if (cachedToken !== token) {
      throw new BadRequestException('Incorrect token');
    }

    const password = this.passwordService.generatePassword();

    const user: UserEntity =
      await this.internalInvitationUoW.createInternalProfile(
        email,
        invitation.role,
        password,
      );

    if (!user.confirmed) {
      this.mailingQueue.add('password-mail', {
        email,
        password: password,
      });
    }
  }

  private createInternalInvitationAndSend(email: string): void {
    const invitationToken: number = this.rngService.generateRandomToken();

    this.cacheManager.set(`${email}-internal-invitation-info`, invitationToken);

    this.mailingQueue.add('internal-invitation-mail', {
      email,
      token: invitationToken,
    });
  }

  private checkInvitation(invitation: InternalInvitationEntity) {
    if (!invitation) {
      throw new NotFoundException('User was not invited');
    }

    if (invitation && invitation.acceptedAt) {
      throw new BadRequestException('Invitation already accepted');
    }
  }
}
