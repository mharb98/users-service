import { Test, TestingModule } from '@nestjs/testing';
import { InternalInvitationsController } from './internal-invitations.controller';

describe('InternalProfilesController', () => {
  let controller: InternalInvitationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InternalInvitationsController],
    }).compile();

    controller = module.get<InternalInvitationsController>(
      InternalInvitationsController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
