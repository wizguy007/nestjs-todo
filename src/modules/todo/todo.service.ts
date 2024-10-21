import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTodoDto, UpdateTodoDto } from './todo.dto';
import { TodoRepository } from './todo.repository';
import { RabbitMQProducerService } from 'src/common/rabbitmq/rabbitmq.producer.service';
import { QUEUES } from 'src/common/rabbitmq/rabbitmq.constant';

@Injectable()
export class TodoService {
	constructor(
		private readonly todoRepository: TodoRepository,
		private readonly rabbitMQProducerService: RabbitMQProducerService,
	) {}

	async getTodos() {
		return this.todoRepository.find({ order: { created_at: 'DESC' } });
	}

	async createTodoViaQueue(payload: CreateTodoDto) {
		await this.rabbitMQProducerService.sendToQueue(QUEUES.CREATE_TODO, {
			title: payload.title,
			description: payload.description,
		});
	}

	async createTodo(payload: CreateTodoDto) {
		await this.todoRepository.save({
			title: payload.title,
			description: payload.description,
		});
	}

	async getTodo(id: number) {
		const todo = await this.todoRepository.findOne({ where: { id } });
		if (!todo) throw new NotFoundException('Todo not found');

		return todo;
	}

	async updateTodo(id: number, payload: UpdateTodoDto) {
		const todo = await this.todoRepository.findOne({ where: { id } });
		if (!todo) throw new NotFoundException('Todo not found');

		await this.todoRepository.update(
			{ id: todo.id },
			{
				title: payload.title,
				description: payload.description,
			},
		);
	}

	async deleteTodo(id: number) {
		const todo = await this.todoRepository.findOne({ where: { id } });
		if (!todo) throw new NotFoundException('Todo not found');

		await this.todoRepository.delete({ id: todo.id });
	}

	async toggleTodoCompleted(id: number) {
		const todo = await this.todoRepository.findOne({ where: { id } });
		if (!todo) throw new NotFoundException('Todo not found');

		await this.todoRepository.update(
			{ id: todo.id },
			{
				completed_at: todo.completed_at ? null : new Date(),
			},
		);
	}
}
