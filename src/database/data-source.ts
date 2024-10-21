import 'dotenv/config';
import { boolean } from 'src/utils/helpers';
import { DataSource, DataSourceOptions, QueryRunner } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
	type: 'postgres',
	applicationName: process.env.APP_NAME,
	host: process.env.DB_HOST,
	port: parseInt(String(process.env.DB_PORT)),
	username: process.env.DB_USERNAME,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME,
	logging: true,
	synchronize: false,
	migrationsTableName: 'migrations',
	entities: [`dist/database/entities/*.entity.js`],
	migrations: [`dist/database/migrations/*.js`],
	extra: {
		...(boolean(process.env.DB_DISABLE_SSL) && { ssl: { rejectUnauthorized: false } }),
	},
};

export const dbTransaction = async <T = any>(dataSource: DataSource, callback: (t: QueryRunner) => Promise<T>): Promise<T> => {
	const queryRunner = dataSource.createQueryRunner();
	await queryRunner.connect();
	await queryRunner.startTransaction();
	try {
		const result = await callback(queryRunner);
		await queryRunner.commitTransaction();
		return result;
	} catch (err) {
		await queryRunner.rollbackTransaction();
		throw err;
	} finally {
		await queryRunner.release();
	}
};

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
