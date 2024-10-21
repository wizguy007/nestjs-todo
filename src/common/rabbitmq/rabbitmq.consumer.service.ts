import { Injectable, Logger } from '@nestjs/common';
import { ConfirmChannel, ConsumeMessage } from 'amqplib';
import { RABBITMQ_QUEUES } from './rabbitmq.constant';
import { RabbitMQConnectionService } from './rabbitmq.connection';

@Injectable()
export class RabbitMQConsumerService {
	private queueName: string;
	private options: any;

	private readonly logger = new Logger(RabbitMQConsumerService.name);

	constructor(private readonly connectionService: RabbitMQConnectionService) {}

	public subscribe(queueName: (typeof RABBITMQ_QUEUES)[number], options?: any) {
		this.queueName = queueName;
		this.options = options;

		return this;
	}

	async consume(callback: (channel: ConfirmChannel, message: ConsumeMessage) => Promise<void>) {
		try {
			await this.connectionService.channelWrapper.addSetup(async (channel: ConfirmChannel) => {
				await channel.assertQueue(this.queueName, this.options);
				await channel.consume(this.queueName, async (message) => {
					if (message) {
						await callback(channel, message);
					}
				});
			});
			this.logger.log(`${this.queueName} Consumer service started and listening for message`);
		} catch (error) {
			this.logger.error(`Error starting the ${this.queueName} consumer:`, error);
		}
	}
}
