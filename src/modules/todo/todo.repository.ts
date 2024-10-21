import { Injectable } from '@nestjs/common';
import { Todo } from 'src/database/entities/todo.entity';
import { DataSource, QueryRunner, Repository } from 'typeorm';

@Injectable()
export class TodoRepository extends Repository<Todo> {
	constructor(dataSource: DataSource) {
		super(Todo, dataSource.createEntityManager());
	}

	withQueryRunner(t: QueryRunner) {
		return t.manager.getRepository(Todo).extend(this);
	}
}
