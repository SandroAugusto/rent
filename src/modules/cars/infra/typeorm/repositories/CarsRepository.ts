import { ICarsRepository, ICreateCarDTO } from "@modules/cars/repositories/ICarsRepository";
import { getRepository, Repository } from "typeorm";
import { Car } from "../entities/Car";



export class CarsRepository implements ICarsRepository {

  private repository: Repository<Car>

  constructor() {
    this.repository = getRepository(Car)
  }
  async findById(id: string): Promise<Car> {
    const car = await this.repository.findOne( { id });
    return car;
  }

  async findAvailable(      
    brand?: string,
    category_id?: string,
    name?: string): Promise<Car[]> {
    
      const carQuery = this.repository
      .createQueryBuilder("c")
      .where("available = :available", { available: true });

      if(brand) {
        carQuery.andWhere("c.brand = :brand", { brand })
      }
      if(category_id) {
        carQuery.andWhere("c.category_id = :category_id", { category_id })
      }
      if(name) {
        carQuery.andWhere("c.name = :name", { name })
      }

      const cars = await carQuery.getMany();

      return cars;
  }

  async findByLicensePlate(license_plate: string): Promise<Car> {
    const car = await this.repository.findOne({ license_plate })

    return car;
  }
  list(): Promise<Car[]> {
    throw new Error("Method not implemented.");
  }
  async create({ name, description, brand, category_id, daily_rate, fine_amount, license_plate, specifications, id }: ICreateCarDTO): Promise<Car> {
    const car = this.repository.create({
      name, 
      description,
       brand, 
       category_id,
        daily_rate,
        fine_amount,
         license_plate,
         specifications,
         id,
    })

    await this.repository.save(car);

    return car
  }
  
}