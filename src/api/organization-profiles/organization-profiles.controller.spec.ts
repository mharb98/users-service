import { Test, TestingModule } from '@nestjs/testing';
import { OrganizationProfilesController } from './organization-profiles.controller';

describe('OrganizationProfilesController', () => {
  let controller: OrganizationProfilesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrganizationProfilesController],
    }).compile();

    controller = module.get<OrganizationProfilesController>(
      OrganizationProfilesController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
