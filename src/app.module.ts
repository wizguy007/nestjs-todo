import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from './database/data-source';
import { TodoModule } from './modules/todo/todo.module';

@Module({
	imports: [
		TypeOrmModule.forRoot(dataSourceOptions),
		// APP MODULE
		TodoModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
