import { Test, TestingModule } from '@nestjs/testing';
import { InternalProfilesService } from './internal-profiles.service';

describe('InternalProfilesService', () => {
  let service: InternalProfilesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InternalProfilesService],
    }).compile();

    service = module.get<InternalProfilesService>(InternalProfilesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
