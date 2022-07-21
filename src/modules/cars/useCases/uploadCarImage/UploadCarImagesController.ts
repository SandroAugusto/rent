import { Request, Response } from "express";
import { container } from "tsyringe";
import { UploardCarImagesUseCase } from "./UplodCarImagesUseCase";

interface Ifiles {
  filename: string;
}

export class UploadCarImagesController {

  async handle(request: Request, response: Response): Promise<Response> {
    const { id }= request.params;
    const images = request.files as Ifiles[];
    const uploadCarImageUseCase = container.resolve(UploardCarImagesUseCase);

    const images_name = images.map((file) => file.filename)

    await uploadCarImageUseCase.execute({
      car_id: id,
      images_name
    })

    return response.status(201).send()
  }
}