import { Logger } from '@nestjs/common';
import { Kafka, Producer } from 'kafkajs';
import { sleep } from '../common/sleep/sleep.service';
import { IProducer } from './producer.interface';

export class KafkajsProducer implements IProducer {
  private readonly kafka: Kafka;
  private readonly logger: Logger;
  private readonly producer: Producer;

  constructor(private readonly topic: string, broker: string) {
    this.kafka = new Kafka({
      brokers: [broker],
    });
    this.producer = this.kafka.producer();
    this.logger = new Logger(topic);
  }

  async connect(): Promise<void> {
    try {
      await this.producer.connect();
    } catch (err) {
      this.logger.error(`Failed to connect to kafka.`, err);
      await sleep(5000);
      await this.connect();
    }
  }

  async disconnect(): Promise<void> {
    await this.producer.disconnect();
  }

  async produce(message: any): Promise<void> {
    await this.producer.send({ topic: this.topic, messages: [message] });
  }
}
