import { REDIS_URL } from '$env/static/private';
import { createClient } from 'redis';
type RedisClient = ReturnType<typeof createClient>;

declare global {
  // eslint-disable-next-line no-var
  var redis: RedisClient | undefined;
}

const redis = globalThis.redis ?? createClient({ url: REDIS_URL });

if (!globalThis.redis) {
  redis.connect().catch(console.error);
  globalThis.redis = redis;
}

export default redis;
