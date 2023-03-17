import { Logger } from '@nestjs/common';
import {
  Consumer,
  ConsumerConfig,
  ConsumerSubscribeTopics,
  Kafka,
  KafkaMessage,
} from 'kafkajs';
import { sleep } from '../common/sleep/sleep.service';
import { IConsumer } from './consumer.interface';
import * as retry from 'async-retry';

export class KafkajsConsumer implements IConsumer {
  private readonly kafka: Kafka;
  private readonly logger: Logger;
  private readonly consumer: Consumer;

  constructor(
    private readonly topics: ConsumerSubscribeTopics,
    config: ConsumerConfig,
    broker: string,
  ) {
    this.kafka = new Kafka({ brokers: [broker] });
    this.consumer = this.kafka.consumer(config);
    this.logger = new Logger(`${topics.topics}-${config.groupId}`);
  }

  async connect(): Promise<void> {
    try {
      await this.consumer.connect();
    } catch (err) {
      this.logger.error(`Failed to connect to kafka.`, err);
      await sleep(5000);
      await this.connect();
    }
  }

  async disconnect(): Promise<void> {
    try {
      await this.consumer.disconnect();
    } catch (err) {}
  }

  async consume(onMessage: (message: any) => Promise<void>): Promise<void> {
    await this.consumer.subscribe(this.topics);
    await this.consumer.run({
      eachMessage: async ({ message, partition }) => {
        this.logger.debug(`Processing message partition: ${partition}`);
        try {
          await retry(async () => onMessage(message), {
            retries: 3,
            onRetry: (error, attempt) =>
              this.logger.error(
                `Error consuming message, executing retry ${attempt}/3`,
                error,
              ),
          });
        } catch (error) {
          this.logger.error(`Error consuming message, adding to DQL...`, error);
          await this.addMessageToDlq(message);
        }
      },
    });
  }

  private async addMessageToDlq(message: KafkaMessage) {
    this.logger.log(`Adding the failed message to the DLQ`);
  }
}
