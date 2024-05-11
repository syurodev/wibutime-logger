import { Injectable, OnModuleInit } from '@nestjs/common';
import { KafkaConsumerService } from './consumer.service';
import { KafkaTopicEnum } from 'src/common/enum/kafka-topic.enum';

@Injectable()
export class Consumer implements OnModuleInit {
  constructor(private readonly consumerService: KafkaConsumerService) {}

  async onModuleInit() {
    await this.consumerService.consumerLogger(
      {
        topic: KafkaTopicEnum.AUTH_LOGGER,
        partition: 0,
        offset: '',
      },
      {
        eachMessage: async ({ topic, partition, message }): Promise<void> => {
          // Đẩy xuống DB collection report-lead
          // this.reportLeadService.create(JSON.parse(message.value.toString()));
        },
      },
    );
  }
}
