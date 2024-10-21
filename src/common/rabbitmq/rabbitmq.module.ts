import { Global, Module } from '@nestjs/common';
import { RabbitMQProducerService } from './rabbitmq.producer.service';
import { RabbitMQConsumerService } from './rabbitmq.consumer.service';
import { RabbitMQConnectionService } from './rabbitmq.connection';

@Global()
@Module({
	providers: [RabbitMQConnectionService, RabbitMQProducerService, RabbitMQConsumerService],
	exports: [RabbitMQConnectionService, RabbitMQProducerService, RabbitMQConsumerService],
})
export class RabbitMQModule {}
