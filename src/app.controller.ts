import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ProducerService } from './Brokers/producer.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly producerService: ProducerService,
  ) {}

  @Get()
  async getHello() {
    await this.producerService.produce('organizations', {
      key: 'create-organization',
      value: JSON.stringify({ id: 2, name: 'Organization' }),
    });
    return 'Hello world';
  }
}
