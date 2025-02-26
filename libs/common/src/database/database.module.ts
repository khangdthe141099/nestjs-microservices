import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  AsyncModelFactory,
  ModelDefinition,
  MongooseModule,
} from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        uri: configService.get('MONGO_URL'),
      }),
      inject: [ConfigService],
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
})
export class DatabaseModule {
  static forFeature(models: ModelDefinition[]) {
    return MongooseModule.forFeature(models);
  }

  static forFeatureAsync(
    factories?: AsyncModelFactory[],
    connectionName?: string,
  ) {
    return MongooseModule.forFeatureAsync(factories, connectionName);
  }
}
