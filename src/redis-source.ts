import 'dotenv/config';
import { REDIS_DISABLE_SSL, REDIS_URL } from './utils/secrets';
import * as url from 'url';

const redis_uri = url.parse(REDIS_URL);
export const redisOptions = {
	url: REDIS_URL,
	host: redis_uri.hostname,
	port: Number(redis_uri.port),
	username: redis_uri?.auth?.split(':')[0],
	password: redis_uri?.auth?.split(':')[1],
	db: 0,
	...(REDIS_DISABLE_SSL && { tls: false as any }),
};
