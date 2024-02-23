import { Global, Module } from '@nestjs/common';
import { CarsController } from './cars.controller';
import { CarsService } from './cars.service';
import { HttpModule } from '@nestjs/axios';

@Global()
@Module({
  imports: [
    HttpModule
  ],
  controllers: [CarsController],
  providers: [CarsService],
})
export class CarsModule {}
