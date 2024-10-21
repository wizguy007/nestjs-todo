import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from './database/data-source';
import { TodoModule } from './modules/todo/todo.module';
import { redisOptions } from './redis-source';
import { CACHE_TTL, REDIS_URL } from './utils/secrets';
import { seconds, ThrottlerModule } from '@nestjs/throttler';
import { ThrottlerStorageRedisService } from '@nest-lab/throttler-storage-redis';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-store';
import { BullModule } from '@nestjs/bull';

@Module({
	imports: [
		TypeOrmModule.forRoot(dataSourceOptions),
		ThrottlerModule.forRoot({
			throttlers: [{ limit: 5, ttl: seconds(60) }],
			storage: new ThrottlerStorageRedisService(REDIS_URL),
		}),
		CacheModule.register<any>({
			store: redisStore,
			isGlobal: true,
			ttl: CACHE_TTL,
			...redisOptions,
		}),
		BullModule.forRoot({
			...redisOptions,
			defaultJobOptions: {
				removeOnComplete: true,
				removeOnFail: true,
			},
		}),
		// APP MODULE
		TodoModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
