import redis from 'redis';
import { promisify } from 'util';

class RedisClient {
  constructor() {
    // display any redis error on console
    this.client = redis.createClient();
    this.client.on('error', (err) => {
      console.log(err);
    });

    // Promisify Redis methods
    this.getAsync = promisify(this.client.get).bind(this.client);
    this.setexAsync = promisify(this.client.setex).bind(this.client);
    this.delAsync = promisify(this.client.del).bind(this.client);
  }

  isAlive() {
    return this.client.connected;
  }

  async get(key) {
    return this.getAsync(key);
  }

  async set(key, value, duration) {
    return this.setexAsync(key, duration, value);
  }

  async del(key) {
    return this.delAsync(key);
  }
}

// export as redisClient
const redisClient = new RedisClient();
export default redisClient;
