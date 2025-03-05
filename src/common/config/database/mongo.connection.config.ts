import { MongooseModuleOptions } from '@nestjs/mongoose';

export class MongoConnectionConfig {
  static getUri(): string {
    return process.env.MONGO_URI ?? '';
  }

  static getMongoConnectionConfig(): MongooseModuleOptions {
    return {
      auth: {
        username: process.env.MONGO_USER,
        password: process.env.MONGO_PASSWORD,
      },
      dbName: 'notifications_db',
    };
  }
}
