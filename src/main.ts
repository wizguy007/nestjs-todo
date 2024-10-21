import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';
import { ClassSerializerInterceptor } from '@nestjs/common';
import { PORT } from './utils/secrets';
import { CustomExceptionFilter } from './filters/exception.filter';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
	app.useGlobalFilters(new CustomExceptionFilter());
	app.setGlobalPrefix('/api/v1');
	app.enableCors();
	await app.listen(PORT);
}
bootstrap();
