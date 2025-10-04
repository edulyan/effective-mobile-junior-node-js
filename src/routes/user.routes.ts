import { Router } from 'express';

import UserController from '../controllers/user.controller';
import { validateBody, validateParams } from '../middlewares/validation.middleware';
import { blockUserSchema, mongoIdSchema } from '../schemas/user.schema';

export const userRouter = Router();

userRouter.get('/', UserController.getAll);
userRouter.get('/:id', validateParams(mongoIdSchema), UserController.getById);
userRouter.patch('/:id/block', validateParams(mongoIdSchema), validateBody(blockUserSchema), UserController.blockUser);
