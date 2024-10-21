import { Injectable, Logger } from '@nestjs/common';
import amqp, { ChannelWrapper } from 'amqp-connection-manager';
import { AMQP_CLIENT } from 'src/utils/secrets';
import { IAmqpConnectionManager } from 'amqp-connection-manager/dist/types/AmqpConnectionManager';

@Injectable()
export class RabbitMQConnectionService {
	public channelWrapper: ChannelWrapper;
	private connection: IAmqpConnectionManager;

	private readonly logger = new Logger(RabbitMQConnectionService.name);

	constructor() {
		this.connection = amqp.connect([AMQP_CLIENT], {
			connectionOptions: {
				clientProperties: { connection_name: 'todo-app' },
			},
		});

		this.channelWrapper = this.connection.createChannel({ json: true });
	}
}
