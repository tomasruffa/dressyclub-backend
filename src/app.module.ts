import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { MongodbConnector } from './shared/connectors/mongodb.connector';
import { SharedModule } from './shared/shared.module';
import { CarsModule } from './controllers/cars/cars.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MongooseModule.forRootAsync({
      useClass: MongodbConnector,
    }),
    SharedModule,
    CarsModule,
  ],
})
export class AppModule {}
