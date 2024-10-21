import { Module } from '@nestjs/common';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import { TodoRepository } from './todo.repository';

@Module({
	imports: [],
	providers: [TodoRepository, TodoService],
	exports: [TodoRepository, TodoService],
	controllers: [TodoController],
})
export class TodoModule {}
