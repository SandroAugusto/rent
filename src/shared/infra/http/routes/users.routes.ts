import { Router } from 'express';


import uploadConfig from "@config/upload";
import multer from 'multer';

const usersRoutes = Router();

const uploadAvatar = multer(uploadConfig.upload("./tmp/avatar"))
import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensureAuthenticated';
import { CreateUserController } from '@modules/accounts/useCases/createUser/CreateUserController';
import { UpdateUserAvatarController } from '@modules/accounts/useCases/updateUserAvatar/UpdateUserAvatarController';
const createUserController = new CreateUserController();
const updateUserAvatarController = new UpdateUserAvatarController();

usersRoutes.post('/', createUserController.handle);

usersRoutes.patch("/avatar", 
ensureAuthenticated,
uploadAvatar.single("avatar"),
updateUserAvatarController.handle)


export {usersRoutes }