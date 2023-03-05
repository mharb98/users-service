import { Test, TestingModule } from '@nestjs/testing';
import { InternalProfilesService } from '../internal-profiles/internal-profiles.service';
import { InternalInvitationsService } from './internal-invitations.service';

describe('InternalProfilesService', () => {
  let service: InternalInvitationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InternalProfilesService],
    }).compile();

    service = module.get<InternalInvitationsService>(
      InternalInvitationsService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
