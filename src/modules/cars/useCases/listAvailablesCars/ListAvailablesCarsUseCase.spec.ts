import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { ListAvailablesCarsUseCase } from "./ListAvailablesCarsUseCase"


let listAvailableCarsUseCase: ListAvailablesCarsUseCase;
let carRepositoryInMemory: CarsRepositoryInMemory;

describe("List Cars", () => {

  beforeEach(() => {
    carRepositoryInMemory = new CarsRepositoryInMemory();
    listAvailableCarsUseCase = new ListAvailablesCarsUseCase(carRepositoryInMemory);
  })
  it("should be able to list all available cars", async () => {

    const car = await carRepositoryInMemory.create({
      name: "Name",
      description: "Description",
      brand: "band",
      category_id: "4t4t-3455yy-64",
      daily_rate: 500,
      fine_amount: 50,
      license_plate: "dfet4345"
    })
    const cars = await listAvailableCarsUseCase.execute({});

    expect(cars).toEqual([car])
  })

  it("should be able to list all available cars by name", async () => {

    const car = await carRepositoryInMemory.create({
      name: "Name_test",
      description: "Description",
      brand: "band_test",
      category_id: "4t4t-3455yy-64",
      daily_rate: 500,
      fine_amount: 50,
      license_plate: "dfet4345"
    })
    const cars = await listAvailableCarsUseCase.execute({
      name: "Name_test"
    });

    expect(cars).toEqual([car])
  })

  it("should be able to list all available cars by brand", async () => {

    const car = await carRepositoryInMemory.create({
      name: "Name_test",
      description: "Description",
      brand: "band_test",
      category_id: "4t4t-3455yy-64",
      daily_rate: 500,
      fine_amount: 50,
      license_plate: "dfet4345"
    })
    const cars = await listAvailableCarsUseCase.execute({
      brand: "band_test"
    });
    expect(cars).toEqual([car])
  })

    it("should be able to list all available cars by category id", async () => {

      const car = await carRepositoryInMemory.create({
        name: "Name_test",
        description: "Description",
        brand: "band_test",
        category_id: "4t4t-3455yy-64",
        daily_rate: 500,
        fine_amount: 50,
        license_plate: "dfet4345"
      })
      const cars = await listAvailableCarsUseCase.execute({
        category_id: "4t4t-3455yy-64"
      });

    expect(cars).toEqual([car])
  })

})