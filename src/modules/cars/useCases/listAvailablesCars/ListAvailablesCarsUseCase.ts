import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { inject, injectable } from "tsyringe";

interface IRequest {
    category_id?: string;
    brand?: string;
    name?: string;
}

@injectable()
export class ListAvailablesCarsUseCase {

  constructor(

    @inject("CarsRepository")
    private carRepository: ICarsRepository
  ){}

  async execute ({ category_id, brand, name }: IRequest): Promise<Car[]> {
    const cars = await this.carRepository.findAvailable(brand, category_id, name);
    return cars;
  }
}