import { BadRequestException, Body, Controller, Get, Post, Put } from '@nestjs/common';
import { CarsService } from './cars.service';

export type carData = {
  _id?: string;
  model?: string;
  brand?: string;
  color?: string;
  value?: string;
  productionCost?: string;
  transportationCost?: string;
}

@Controller('/cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  @Get()
  async getFavoriteWallets(): Promise<any> {
    return await this.carsService.getCars();
  }

  @Post()
  async postFavoriteWallet(
    @Body() body: carData,
  ): Promise<any> {
    return await this.carsService.saveCar(body);
  }

  @Put()
  async batchUpdateCars(
    @Body() changes: carData[]
    ): Promise<{message: string}> {
    try {
      await this.carsService.batchUpdateCars(changes);
      return {
        message: 'Cars updated successfully',
      }
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
