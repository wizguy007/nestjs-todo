import { z } from 'zod';

export const CreateTodoSchema = z.object({
	title: z.string({ required_error: 'Title is required' }),
	description: z.string().optional(),
});

export const UpdateTodoSchema = z.object({
	title: z.string({ required_error: 'Title is required' }),
	description: z.string().optional(),
});
