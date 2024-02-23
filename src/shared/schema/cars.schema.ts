import { Prop, Schema } from '@nestjs/mongoose';

@Schema()
export class CarsSchema {
  @Prop()
  _id?: string;
  @Prop()
  model: string;
  @Prop()
  brand: string;
  @Prop()
  color: string;
  @Prop()
  value: string;
  @Prop()
  productionCost: string;
  @Prop()
  transportationCost: string;
}
