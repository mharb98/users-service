import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ConsumerService } from '../Brokers/consumer.service';
import { OrganizationsService } from './organizations.service';

@Injectable()
export class OrganizationsConsumer implements OnModuleInit {
  constructor(
    private consumer: ConsumerService,
    private readonly configService: ConfigService,
    private organizationsService: OrganizationsService,
  ) {}

  async onModuleInit() {
    await this.consumer.consume({
      topics: { topics: ['organizations'] },
      config: { groupId: this.configService.get('GROUP_ID') },
      onMessage: (message) => this.handleMessageConsumption(message),
    });
  }

  private async handleMessageConsumption(message: any): Promise<void> {
    const key = message.key.toString();
    const value = JSON.parse(message.value.toString());

    switch (key) {
      case 'create-organization':
        this.handleOrganizationCreation(value);
        return;
      default:
        return;
    }
  }

  private async handleOrganizationCreation(message) {
    const id: number = message.id;
    const name: string = message.name;

    await this.organizationsService.createOrganization({ id, name });
  }
}
