import uploadConfig from "@config/upload";
import multer from 'multer';

import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarController";
import { CreateCarSpecificationsController } from "@modules/cars/useCases/createCarSpecification/CreateCarSpecificationsController";
import { ListAvailablesController } from "@modules/cars/useCases/listAvailablesCars/ListAvailablesCarsController";
import { UploadCarImagesController } from "@modules/cars/useCases/uploadCarImage/UploadCarImagesController";
import { Router } from "express";
import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

export const carsRoutes = Router()

const createCarcontroller = new CreateCarController();
const listAvailablesController = new ListAvailablesController()
const createCarSpecificationsController = new CreateCarSpecificationsController()
const uploadCarImageController = new UploadCarImagesController()

const upload = multer(uploadConfig.upload("./tmp/cars"))

carsRoutes.post("/",ensureAuthenticated, ensureAdmin, createCarcontroller.handle)
carsRoutes.get("/available",listAvailablesController.handle)

carsRoutes.post("/specifications/:id", ensureAuthenticated, ensureAdmin, createCarSpecificationsController.handle)

carsRoutes.post("/images/:id", ensureAuthenticated, ensureAdmin, upload.array("images"), uploadCarImageController.handle)