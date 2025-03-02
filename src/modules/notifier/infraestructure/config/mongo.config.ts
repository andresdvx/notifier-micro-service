import { MongooseModule } from '@nestjs/mongoose';

const mongoUri = process.env.MONGO_URI || '';
export const MongoConfig = MongooseModule.forRoot(mongoUri, {
  auth: {
    username: process.env.MONGO_USER,
    password: process.env.MONGO_PASSWORD,
  },
  dbName: 'notifier_db',
});
