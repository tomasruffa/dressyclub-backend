import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CarsSchema } from '../../shared/schema/cars.schema';
import { Model } from 'mongoose';
import { v4 as uuid } from 'uuid';
import { carData } from './cars.controller';
import { CarsModel } from 'src/shared/schema/models';

@Injectable()
export class CarsService {
  constructor(
    @InjectModel(CarsModel.name)
    private carsModel: Model<CarsSchema>,
  ) { }

  async getCars(): Promise<any> {
    try {
      const elements = await this.carsModel.find().lean();
      const finalData = elements.map((element) => {
        return {
          _id: element._id,
          model: element.model,
          brand: element.brand,
          color: element.color,
          value: element.value,
          productionCost: element.productionCost,
          transportationCost: element.transportationCost,
          total: (parseInt(element.productionCost) + parseInt(element.transportationCost)).toString(),
        };
      }
      );
      return finalData;
       
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async batchUpdateCars(changes: any[]): Promise<void> {
    try {
      const updateOperations = changes.map(({ _id, ...updatedFields }) => ({
        updateOne: {
          filter: { _id },
          update: { $set: updatedFields },
        },
      }));

      await this.carsModel.bulkWrite(updateOperations);
    } catch (error) {
      throw new Error(error);
    }
  }

  async saveCar(car: carData): Promise<{ message: string }> {
    try {
      await this.carsModel.create({ _id: uuid(), ...car });
      return { message: 'Car saved successfully' };
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
