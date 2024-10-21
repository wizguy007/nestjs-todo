import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTodosTable1729484756732 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		const table = new Table({
			name: 'todos',
			columns: [
				{
					name: 'id',
					type: 'bigint',
					isPrimary: true,
					isGenerated: true,
					generationStrategy: 'increment',
				},
				{
					name: 'title',
					type: 'varchar',
				},
				{
					name: 'description',
					type: 'text',
				},
				{
					name: 'completed_at',
					type: 'timestamp with time zone',
					isNullable: true,
				},
				{
					name: 'created_at',
					type: 'timestamp with time zone',
					default: 'NOW()',
				},
				{
					name: 'updated_at',
					type: 'timestamp with time zone',
					default: 'NOW()',
				},
				{
					name: 'deleted_at',
					type: 'timestamp with time zone',
					isNullable: true,
				},
			],
		});
		await queryRunner.createTable(table);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('todos');
	}
}
