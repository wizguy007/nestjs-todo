import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { ValidationException } from 'src/exceptions/validation.exception';

@Catch()
export class CustomExceptionFilter implements ExceptionFilter {
	catch(exception: any, host: ArgumentsHost) {
		const ctx = host.switchToHttp();
		const response = ctx.getResponse();

		console.log(exception);

		new Logger('Application Context').error(exception);

		if (exception instanceof ValidationException) {
			return response.status(exception.getStatus()).json({
				status: false,
				message: exception.message,
				errors: exception.getErrors(),
			});
		}

		if (exception instanceof HttpException) {
			return response.status(exception.getStatus()).json({
				status: false,
				message: exception.message,
			});
		}

		return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
			status: false,
			message: exception.message || exception.error,
		});
	}
}
