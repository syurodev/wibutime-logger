import { Module } from '@nestjs/common';

import { KafkaService } from './kafka.service';
import { KafkaConsumerService } from './consumer.service';

@Module({
  providers: [KafkaService, KafkaConsumerService],
})
export class KafkaModule {}
