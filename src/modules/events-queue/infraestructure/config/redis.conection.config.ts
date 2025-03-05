export class RegisConfig {
  static getRedisConection() {
    return {
      host: process.env.REDIS_HOST,
      port: parseInt(process.env.REDIS_PORT || '6379'),
    };
  }
}
