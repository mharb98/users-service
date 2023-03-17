import { Injectable } from '@nestjs/common';
import { ProducerService } from '../../Brokers/producer.service';

@Injectable()
export class InternalUserProducersService {
  constructor(private producerService: ProducerService) {}

  async createModerator(createModeratorInput: {
    id: number;
    name?: string;
    email: string;
  }) {
    const { id, name, email } = createModeratorInput;
    await this.producerService.produce('users', {
      key: 'create-moderator',
      value: JSON.stringify({ id, name, email }),
    });
  }

  async deleteModerator(internalProfileId: number) {
    await this.producerService.produce('users', {
      key: 'delete-moderator',
      value: JSON.stringify({ id: internalProfileId }),
    });
  }
}
