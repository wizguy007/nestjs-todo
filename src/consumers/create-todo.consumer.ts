import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import 'dotenv/config';
import { RabbitMQConsumerService } from 'src/common/rabbitmq/rabbitmq.consumer.service';
import { QUEUES } from 'src/common/rabbitmq/rabbitmq.constant';
import { TodoService } from 'src/modules/todo/todo.service';
import { Logger } from '@nestjs/common';

async function bootstrap() {
	const app = await NestFactory.createApplicationContext(AppModule);

	const rabbitMQConsumerService = app.get(RabbitMQConsumerService);
	const todoService = app.get(TodoService);
	const logger = new Logger(QUEUES.CREATE_TODO);

	await rabbitMQConsumerService.subscribe(QUEUES.CREATE_TODO).consume(async (channel, message) => {
		try {
			const content = JSON.parse(message.content.toString());

			await todoService.createTodo({
				title: content.title,
				description: content.description,
			});

			channel.ack(message);
		} catch (error) {
			logger.error(error.message);
			channel.ack(message);
		}
	});
}

bootstrap()
	.then(() => console.log(`[x] Bootstrap completed`))
	.catch((error) => console.error(`[x] Error: `, error));
