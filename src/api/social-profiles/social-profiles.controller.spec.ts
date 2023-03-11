import { Test, TestingModule } from '@nestjs/testing';
import { SocialProfilesController } from './social-profiles.controller';

describe('SocialProfilesController', () => {
  let controller: SocialProfilesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SocialProfilesController],
    }).compile();

    controller = module.get<SocialProfilesController>(SocialProfilesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
