import { InjectQueue } from '@nestjs/bull';
import {
  BadRequestException,
  CACHE_MANAGER,
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Queue } from 'bull';
import { PasswordService } from '../../common/hashing/password.service';
import { RngService } from '../../common/rng/rng.service';
import { OrganizationInvitationDto } from './dtos/create-organization-invitation.dto';
import { OrganizationInvitationEntity } from './entities/organization-invitation.entity';
import { OrganizationInvitationsRepository } from './repositories/organization-invitations-repository.interface';
import { Cache } from 'cache-manager';
import { OrganizationInvitationUnitOfWork } from './repositories/organization-invitation.unit-of-work';

@Injectable()
export class OrganizationInvitationsService {
  constructor(
    private rngService: RngService,
    private passwordService: PasswordService,
    private organizationInvitationUoW: OrganizationInvitationUnitOfWork,
    @Inject(CACHE_MANAGER)
    private cacheManager: Cache,
    @InjectQueue('mailing-queue')
    private mailingQueue: Queue,
    @Inject('OrganizationInvitationsRepository')
    private organizationInvitationsRepository: OrganizationInvitationsRepository,
  ) {}

  async createInvitation(
    organizationId: number,
    organizationInvitationDto: OrganizationInvitationDto,
  ): Promise<OrganizationInvitationEntity> {
    let invitation: OrganizationInvitationEntity =
      await this.organizationInvitationsRepository.findOne({
        email: organizationInvitationDto.email,
        organizationId,
      });

    if (invitation) {
      if (invitation.acceptedAt) {
        throw new BadRequestException(
          'User has already belongs to your organization',
        );
      } else {
        throw new ConflictException('User has already been invited');
      }
    }

    invitation = await this.organizationInvitationsRepository.create({
      ...organizationInvitationDto,
      organizationId,
    });

    this.createTokenAndSend(organizationInvitationDto.email);

    return invitation;
  }

  async resendInvitation(invitationId: number): Promise<void> {
    const invitation: OrganizationInvitationEntity =
      await this.organizationInvitationsRepository.findOne({
        id: invitationId,
      });

    this.checkInvitation(invitation);

    this.createTokenAndSend(invitation.email);
  }

  async deleteInvitation(invitaitonId: number): Promise<void> {
    const invitation: OrganizationInvitationEntity =
      await this.organizationInvitationsRepository.findOne({
        id: invitaitonId,
      });

    this.checkInvitation(invitation);

    await this.organizationInvitationsRepository.delete(invitaitonId);
  }

  async acceptInvitation(email: string, token: number): Promise<void> {
    const invitation: OrganizationInvitationEntity =
      await this.organizationInvitationsRepository.findOne({
        email: email,
      });

    this.checkInvitation(invitation);

    const cachedToken = await this.cacheManager.get(
      `${email}-organization-invitation-info`,
    );

    if (!cachedToken) {
      throw new BadRequestException('Token has expired');
    }

    if (cachedToken !== token) {
      throw new BadRequestException('Incorrect token');
    }

    const password = this.passwordService.generatePassword();

    this.organizationInvitationUoW.createOrganizationProfile(
      invitation,
      password,
    );
  }

  private createTokenAndSend(email: string): void {
    const invitationToken: number = this.rngService.generateRandomToken();
    this.cacheManager.set(
      `${email}-organization-invitation-info`,
      invitationToken,
    );
    this.mailingQueue.add('organization-invitation-mail', {
      email,
      token: invitationToken,
    });
  }

  private checkInvitation(invitation: OrganizationInvitationEntity) {
    if (!invitation) {
      throw new NotFoundException('Could not find the specified invitation');
    }

    if (invitation.acceptedAt) {
      throw new BadRequestException('Invitation has already been accepted');
    }
  }
}
