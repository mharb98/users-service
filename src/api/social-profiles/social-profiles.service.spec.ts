import { Test, TestingModule } from '@nestjs/testing';
import { SocialProfilesService } from './social-profiles.service';

describe('SocialProfilesService', () => {
  let service: SocialProfilesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SocialProfilesService],
    }).compile();

    service = module.get<SocialProfilesService>(SocialProfilesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
