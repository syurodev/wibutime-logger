import { Injectable, OnApplicationShutdown } from '@nestjs/common';
import { TopicPartitionOffset } from '@nestjs/microservices/external/kafka.interface';
import { Consumer, ConsumerRunConfig, Kafka } from 'kafkajs';

@Injectable()
export class KafkaConsumerService implements OnApplicationShutdown {
  private readonly kafka = new Kafka({
    brokers: [
      `${process.env.CONFIG_KAFKA_HOST}:${process.env.CONFIG_KAFKA_PORT}`,
    ],
  });
  private readonly consumers: Consumer[] = [];

  /**
   *
   * @param topic
   * @param config
   */

  async consumerLogger(
    topic: TopicPartitionOffset,
    config: ConsumerRunConfig,
  ): Promise<void> {
    const consumer = this.kafka.consumer({ groupId: 'wibutime-logger' });
    await consumer.connect();
    await consumer.subscribe(topic);
    await consumer.run(config);
    this.consumers.push(consumer);
  }
  async onApplicationShutdown() {
    // @ts-ignore
    for (const consumer: Consumer of this.consumers) {
      await consumer.disconnect();
    }
  }
}
