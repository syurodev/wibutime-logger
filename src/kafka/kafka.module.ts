import { Global, Module } from '@nestjs/common';

import { KafkaService } from './kafka.service';
import { KafkaConsumerService } from './consumer.service';

@Global()
@Module({
  providers: [KafkaService, KafkaConsumerService],
  exports: [KafkaConsumerService],
})
export class KafkaModule {}
