import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { SpecificationsRepositoryInMemory } from "@modules/cars/repositories/in-memory/SpecificationsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";
import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase";

let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let carRepositoryInMemory: CarsRepositoryInMemory;
let specificationsRepositoryInMemory: SpecificationsRepositoryInMemory;

describe("Create car specification", () => {

  beforeEach(() => {
    carRepositoryInMemory = new CarsRepositoryInMemory();
    specificationsRepositoryInMemory = new SpecificationsRepositoryInMemory()
    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(carRepositoryInMemory, specificationsRepositoryInMemory);
    })

  it("Should not be able to add a new specification to a non-existing car", async() => {
    expect(async () => {
      const car_id = "1234";
      const specifications_id = ["2344"];
      await createCarSpecificationUseCase.execute({ car_id, specifications_id })
    }).rejects.toBeInstanceOf(AppError)

  })

  it("Should be able to add a new specification to the car", async() => {
    const car = await carRepositoryInMemory.create({
      name: "Name",
      description: "Description",
      brand: "band",
      category_id: "4t4t-3455yy-64",
      daily_rate: 500,
      fine_amount: 50,
      license_plate: "dfet4345"
    });

    const specification = await specificationsRepositoryInMemory.create({
      description: "test", name: "test"
    })

    const specifications_id = [specification.id];
    const specificationsCars =  await createCarSpecificationUseCase.execute({ car_id: car.id, specifications_id 
    });
    
    expect(specificationsCars).toHaveProperty("specifications");
    expect(specificationsCars.specifications.length).toBe(1);
  });
});