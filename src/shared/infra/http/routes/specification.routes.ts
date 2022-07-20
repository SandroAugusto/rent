import { CreateSpecificationController } from '@modules/cars/useCases/createSpecification/CreateSpecificationController';
import { ListCategoriesController } from '@modules/cars/useCases/listCategories/ListCategoriesController';
import { Router } from 'express';
import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensureAuthenticated';

const specificationsRoutes = Router();

const createSpecificationController = new CreateSpecificationController();
const listCategoriesController = new ListCategoriesController();

specificationsRoutes.use(ensureAuthenticated);
specificationsRoutes.post('/', createSpecificationController.handle);


specificationsRoutes.get('/', listCategoriesController.handle);


export {specificationsRoutes }