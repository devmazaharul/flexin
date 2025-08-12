import { Redis } from 'ioredis';

const redisConnection = new Redis({
  host: process.env.REDIS_HOST || 'localhost',
  port: 6379,
  password: process.env.REDIS_PASSWORD || undefined,

  // ✅ Required for BullMQ
  maxRetriesPerRequest: null,
});

export default redisConnection;
