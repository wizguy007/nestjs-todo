import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { RabbitMQConnectionService } from './rabbitmq.connection';
import { RABBITMQ_QUEUES } from './rabbitmq.constant';

@Injectable()
export class RabbitMQProducerService {
	private readonly logger = new Logger(RabbitMQConnectionService.name);

	constructor(private readonly connectionService: RabbitMQConnectionService) {}

	async sendToQueue(queueName: (typeof RABBITMQ_QUEUES)[number], payload: any) {
		try {
			await this.connectionService.channelWrapper.assertQueue(queueName, { durable: true });

			await this.connectionService.channelWrapper.sendToQueue(queueName, payload, {
				persistent: true,
			});
			this.logger.log(`[x] sent to queue ${queueName}`);
		} catch (error: any) {
			this.logger.error(`Error sending to ${queueName} queue:`, error);
			throw new HttpException('Error sending to queue', HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}
