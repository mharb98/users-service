import { Test, TestingModule } from '@nestjs/testing';
import { OrganizationInvitationsService } from './organization-invitations.service';

describe('OrganizationInvitationsService', () => {
  let service: OrganizationInvitationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrganizationInvitationsService],
    }).compile();

    service = module.get<OrganizationInvitationsService>(OrganizationInvitationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
