import { HttpException, HttpStatus } from '@nestjs/common';

export class ValidationException extends HttpException {
	errors: Record<string, any>;

	constructor(errors: Record<string, unknown>) {
		super(
			{
				message: 'The given field is invalid',
			},
			HttpStatus.UNPROCESSABLE_ENTITY,
		);
		this.errors = errors;
	}

	getErrors() {
		return this.errors;
	}
}
