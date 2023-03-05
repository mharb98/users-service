import { Test, TestingModule } from '@nestjs/testing';
import { InternalRolesService } from './internal-roles.service';

describe('InternalRolesService', () => {
  let service: InternalRolesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InternalRolesService],
    }).compile();

    service = module.get<InternalRolesService>(InternalRolesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
