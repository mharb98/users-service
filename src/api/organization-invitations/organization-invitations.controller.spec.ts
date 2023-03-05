import { Test, TestingModule } from '@nestjs/testing';
import { OrganizationInvitationsController } from './organization-invitations.controller';

describe('OrganizationInvitationsController', () => {
  let controller: OrganizationInvitationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrganizationInvitationsController],
    }).compile();

    controller = module.get<OrganizationInvitationsController>(OrganizationInvitationsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
