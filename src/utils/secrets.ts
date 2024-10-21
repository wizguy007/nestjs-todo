import * as env from 'env-var';

export const NODE_ENV = env.get('NODE_ENV').required().asEnum(['production', 'staging', 'development']);
export const PORT = env.get('PORT').default(3000).required().asPortNumber();

export const APP_NAME = env.get('APP_NAME').required().asString();

export const REDIS_URL = env.get('REDIS_URL').required().asString();
export const REDIS_DISABLE_SSL = env.get('REDIS_DISABLE_SSL').default('true').required().asBool();
export const CACHE_TTL = env.get('CACHE_TTL').default(5000).required().asIntPositive();

export const DB_HOST = env.get('DB_HOST').required().asString();
export const DB_PORT = env.get('DB_PORT').required().asIntPositive();
export const DB_DISABLE_SSL = env.get('DB_DISABLE_SSL').default('true').required().asBool();
export const DB_USERNAME = env.get('DB_USERNAME').required().asString();
export const DB_PASSWORD = env.get('DB_PASSWORD').required().asString();
export const DB_NAME = env.get('DB_NAME').required().asString();
