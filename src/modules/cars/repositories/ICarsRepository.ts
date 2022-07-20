import { ICreateCarDTO } from "../dtos/ICreateCarDTO";
import { Car } from "../infra/typeorm/entities/Car";



interface ICarsRepository {
  findById(id: string): Promise<Car>;
  findByLicensePlate(license_plate: string): Promise<Car>;
  list(): Promise<Car[]>;
  create({    
    name,
    description,
    brand,
    category_id,
    daily_rate,
    fine_amount,
    license_plate}: ICreateCarDTO): Promise<Car>;
    findAvailable(
      brand?: string,
      category_id?: string,
      name?: string,
    ):  Promise<Car[]>;
}

export { ICarsRepository, ICreateCarDTO }