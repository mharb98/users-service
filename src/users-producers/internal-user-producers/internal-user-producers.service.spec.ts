import { Test, TestingModule } from '@nestjs/testing';
import { InternalUserProducersService } from './internal-user-producers.service';

describe('InternalUserProducersService', () => {
  let service: InternalUserProducersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InternalUserProducersService],
    }).compile();

    service = module.get<InternalUserProducersService>(InternalUserProducersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
