import { AsyncModelFactory, SchemaFactory } from '@nestjs/mongoose';
import { CarsSchema } from './cars.schema';
import { Schema } from 'mongoose';

export const CarsModel: AsyncModelFactory = {
  name: 'cars',
  useFactory: (): Schema => {
    return SchemaFactory.createForClass(CarsSchema);
  },
};

export const Models: AsyncModelFactory[] = [
  CarsModel,
];
