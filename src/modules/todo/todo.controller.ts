import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { TodoService } from './todo.service';
import { IResponse } from 'src/definition';
import { successRequestResponse } from 'src/utils/helpers';
import { CreateTodoDto, UpdateTodoDto } from './todo.dto';
import { ZodValidationPipe } from 'src/pipes/zod-validation.pipe';
import { CreateTodoSchema, UpdateTodoSchema } from './todo.validation';

@Controller('todos')
export class TodoController {
	constructor(private readonly todoService: TodoService) {}

	@Get('')
	async getTodos(): Promise<IResponse> {
		const response = await this.todoService.getTodos();
		return successRequestResponse('Action successful', response);
	}

	@Post('')
	async createTodo(@Body(new ZodValidationPipe(CreateTodoSchema)) body: CreateTodoDto): Promise<IResponse> {
		const response = await this.todoService.createTodoViaQueue(body);
		return successRequestResponse('Action successful', response);
	}

	@Get(':id')
	async getTodo(@Param('id', ParseIntPipe) id: number): Promise<IResponse> {
		const response = await this.todoService.getTodo(id);
		return successRequestResponse('Action successful', response);
	}

	@Put(':id')
	async updateTodo(@Param('id', ParseIntPipe) id: number, @Body(new ZodValidationPipe(UpdateTodoSchema)) body: UpdateTodoDto): Promise<IResponse> {
		const response = await this.todoService.updateTodo(id, body);
		return successRequestResponse('Action successful', response);
	}

	@Delete(':id')
	async deleteTodo(@Param('id', ParseIntPipe) id: number): Promise<IResponse> {
		const response = await this.todoService.deleteTodo(id);
		return successRequestResponse('Action successful', response);
	}

	@Post(':id/toggle-completed')
	async toggleTodoCompleted(@Param('id', ParseIntPipe) id: number): Promise<IResponse> {
		const response = await this.todoService.toggleTodoCompleted(id);
		return successRequestResponse('Action successful', response);
	}
}
