import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConsumerService } from './Brokers/consumer.service';

@Injectable()
export class TestConsumer implements OnModuleInit {
  constructor(private readonly consumerService: ConsumerService) {}

  async onModuleInit() {
    await this.consumerService.consume({
      topics: { topics: ['test'] },
      config: { groupId: 'test-consumer' },
      onMessage: async (message) => {
        console.log(message.value.toString());
      },
    });
  }
}
