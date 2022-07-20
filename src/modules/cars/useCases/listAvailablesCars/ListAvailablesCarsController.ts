import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListAvailablesCarsUseCase } from "./ListAvailablesCarsUseCase";


export class ListAvailablesController {
 async handle(request: Request, response: Response): Promise<Response> {
    const { brand, name, category_id } = request.query;

    const listAvailableCarsUseCase = container.resolve(ListAvailablesCarsUseCase)

    const cars = await listAvailableCarsUseCase.execute({
      brand: brand as string, 
      name: name as string, 
      category_id: category_id as string
    });

    return response.json(cars)
  } 
}