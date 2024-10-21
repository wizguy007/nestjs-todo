import { Injectable, PipeTransform } from '@nestjs/common';
import { IObjectInterface } from 'src/definition';
import { ValidationException } from 'src/exceptions/validation.exception';
import { ZodIssue, ZodSchema } from 'zod';

@Injectable()
export class ZodValidationPipe implements PipeTransform {
	constructor(private readonly schema: ZodSchema) {}

	transform(value: any) {
		const { error } = this.schema.safeParse(value);

		if (error) {
			throw new ValidationException(Array.isArray(error.errors) ? this.convertErrorsToKeyValues(error.errors) : error.errors);
		}

		return value;
	}

	private convertErrorsToKeyValues(details: ZodIssue[]): IObjectInterface {
		const formatted: Record<string, string> = {};
		details.forEach((detail: ZodIssue) => {
			console.log(JSON.stringify(detail, null, 2));
			formatted[String(detail.path[0])] = detail.message;
		});
		return formatted;
	}
}
