import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";
import { CreateCarUseCase } from "./CreateCarUseCase"


let createCarUseCase: CreateCarUseCase;
let carsRepository: CarsRepositoryInMemory;

describe("create Car", ()=> {

  beforeEach(() => {
    carsRepository = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepository);
  })

  it("Should be able to create a new car", async() => {
   const car =  await createCarUseCase.execute({
      name: "Name",
      description: "Description",
      brand: "band",
      category_id: "4t4t-3455yy-64",
      daily_rate: 500,
      fine_amount: 50,
      license_plate: "dfet4345"
    })

    expect(car).toHaveProperty("id");
    
  })

  it("Should not be able to create a new car with same license plate", async() => {
    expect(async () => {
      await createCarUseCase.execute({
        name: "Name",
        description: "Description",
        brand: "band",
        category_id: "4t4t-3455yy-64",
        daily_rate: 500,
        fine_amount: 50,
        license_plate: "dfet4345"
      });
      await createCarUseCase.execute({
        name: "Name2",
        description: "Description",
        brand: "band",
        category_id: "4t4t-3455yy-64",
        daily_rate: 500,
        fine_amount: 50,
        license_plate: "dfet4345"
      });
    }).rejects.toBeInstanceOf(AppError)

  })

  it("Should be able to create a new car with available true by default", async() => {
   const car = await createCarUseCase.execute({
      name: "Name",
      description: "Description",
      brand: "band",
      category_id: "4t4t-3455yy-64",
      daily_rate: 500,
      fine_amount: 50,
      license_plate: "dfet4345"
    })

    expect(car.available).toBe(true);
  })
})