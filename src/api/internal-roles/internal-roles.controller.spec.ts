import { Test, TestingModule } from '@nestjs/testing';
import { InternalRolesController } from './internal-roles.controller';

describe('InternalRolesController', () => {
  let controller: InternalRolesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InternalRolesController],
    }).compile();

    controller = module.get<InternalRolesController>(InternalRolesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
