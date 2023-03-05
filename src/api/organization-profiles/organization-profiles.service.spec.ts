import { Test, TestingModule } from '@nestjs/testing';
import { OrganizationProfilesService } from './organization-profiles.service';

describe('OrganizationProfileService', () => {
  let service: OrganizationProfilesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrganizationProfilesService],
    }).compile();

    service = module.get<OrganizationProfilesService>(
      OrganizationProfilesService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
