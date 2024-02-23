import { Global, Module } from '@nestjs/common';
import { Models } from './schema/models';
import { MongooseModule } from '@nestjs/mongoose';
import { ResponseHandler } from './handlers/response.handler';
import { HttpModule } from '@nestjs/axios';

const MongodbModels = MongooseModule.forFeatureAsync(Models);

@Global()
@Module({
  controllers: [],
  imports: [
    MongodbModels,
    HttpModule,
  ],
  providers: [
    ResponseHandler,
  ],
  exports: [
    MongodbModels,
    ResponseHandler,
  ],
})
export class SharedModule {}
