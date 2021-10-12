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
  configService.get<string>('MONGO_USERNAME') +
  ':' +
  configService.get<string>('MONGO_PASSWORD') +
  '@nodemongo.p3r9u.mongodb.net/' +
  configService.get<string>('MONGO_DB');
