import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from './database/data-source';

@Module({
	imports: [
		TypeOrmModule.forRoot(dataSourceOptions),
		// APP MODULE
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
