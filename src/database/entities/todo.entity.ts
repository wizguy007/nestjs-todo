import { Exclude, Expose } from 'class-transformer';
import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'todos' })
export class Todo {
	@Exclude({ toPlainOnly: true })
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	title: string;

	@Column()
	description?: string;

	@Exclude({ toPlainOnly: true })
	@Column({ type: 'timestamp with time zone', nullable: true })
	completed_at?: Date | null;

	@Exclude({ toPlainOnly: true })
	@CreateDateColumn()
	created_at: Date;

	@Exclude({ toPlainOnly: true })
	@UpdateDateColumn()
	updated_at: Date;

	@Exclude({ toPlainOnly: true })
	@DeleteDateColumn()
	deleted_at?: Date;

	@Expose()
	get is_completed() {
		return !!this.completed_at;
	}
}
