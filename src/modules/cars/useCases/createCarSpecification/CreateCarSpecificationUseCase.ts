import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

interface IRequest {
  car_id: string;
  specifications_id: string[];
}

@injectable()
export class CreateCarSpecificationUseCase {

  constructor(
    //@inject("CarsRepository")
    private carRepository: ICarsRepository
  ){}

  async execute({ car_id, specifications_id }: IRequest): Promise<void> {
    const carExists = await this.carRepository.findById(car_id);

    if(!carExists) {
      throw new AppError("Car dos not exists")
    }
  }
}