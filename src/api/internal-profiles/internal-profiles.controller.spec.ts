import { Test, TestingModule } from '@nestjs/testing';
import { InternalProfilesController } from './internal-profiles.controller';

describe('InternalProfilesController', () => {
  let controller: InternalProfilesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InternalProfilesController],
    }).compile();

    controller = module.get<InternalProfilesController>(
      InternalProfilesController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
