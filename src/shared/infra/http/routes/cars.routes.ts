import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarController";
import { ListAvailablesController } from "@modules/cars/useCases/listAvailablesCars/ListAvailablesCarsController";
import { Router } from "express";
import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

export const carsRoutes = Router()

const createCarcontroller = new CreateCarController();

const listAvailablesController = new ListAvailablesController()

carsRoutes.post("/",ensureAuthenticated, ensureAdmin, createCarcontroller.handle)
carsRoutes.get("/available",listAvailablesController.handle)