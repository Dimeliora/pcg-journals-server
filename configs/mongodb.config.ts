import { ConfigService } from '@nestjs/config';
import { MongooseModuleOptions } from '@nestjs/mongoose';

export const getMongoDBConfig = async (
  configService: ConfigService,
): Promise<MongooseModuleOptions> => ({
  uri: getMongoDBConnectionString(configService),
  retryWrites: true,
  w: 'majority',
});

const getMongoDBConnectionString = (configService: ConfigService): string =>
  'mongodb+srv://' +
  configService.get('MONGO_USERNAME') +
  ':' +
  configService.get('MONGO_PASSWORD') +
  '@nodemongo.p3r9u.mongodb.net/' +
  configService.get('MONGO_DB');
