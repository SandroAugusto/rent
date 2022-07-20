
import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICarsRepository, ICreateCarDTO } from "../ICarsRepository";

class CarsRepositoryInMemory implements ICarsRepository {
  cars: Car[] =  [];

  
  async findById(id: string): Promise<Car> {
    const car = this.cars.find((car) => car.id === id);
    return car;
  }
  
  async findAvailable(
    brand?: string,
    category_id?: string,
    name?: string,
  ): Promise<Car[]> {
    const cars = this.cars
    .filter(car => car.available === true)
    .filter((car) => (brand && car.brand === brand)
    ||(car => category_id && car.category_id === category_id)
    || (car => name && car.name === name)
    );
    return cars;
  }



  async findByLicensePlate(license_plate: string): Promise<Car> {
    const car = this.cars.find(car => car.license_plate === license_plate);
    return car;
  }
  async list(): Promise<Car[]> {
    const all = this.cars;
    return all;
  }
  async create({    
    name,
    description,
    brand,
    category_id,
    daily_rate,
    fine_amount,
    license_plate }: ICreateCarDTO): Promise<Car> {
    const car = new Car();

    Object.assign( car, {
      name,
      description,
      brand,
      category_id,
      daily_rate,
      fine_amount,
      license_plate
    } )

    this.cars.push(car)

    return car;
  }

}

export { CarsRepositoryInMemory }