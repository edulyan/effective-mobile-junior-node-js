import { Router } from 'express';

import UserController from '../controllers/user.controller';
import { validateParams } from '../middlewares/validation.middleware';
import { mongoIdSchema } from '../schemas/user.schema';

export const userRouter = Router();

userRouter.get('/', UserController.getAll);
userRouter.get('/:id', validateParams(mongoIdSchema), UserController.getById);
