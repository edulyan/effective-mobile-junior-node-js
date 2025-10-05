import { Router, Response } from 'express';

import UserController from '../controllers/user.controller';
import { validateBody, validateParams } from '../middlewares/validation.middleware';
import { blockUserSchema, mongoIdSchema } from '../schemas/user.schema';
import { authMiddleware, requireAdmin } from '../middlewares/auth.middleware';
import { EffectiveMobileRequest } from '../interfaces/user.interface';

export const userRouter = Router();

userRouter.get('/', authMiddleware, UserController.getAll);
userRouter.get('/:id', authMiddleware, requireAdmin, validateParams(mongoIdSchema), UserController.getById);
userRouter.patch(
  '/:id/block',
  authMiddleware,
  validateParams(mongoIdSchema),
  validateBody(blockUserSchema),
  UserController.blockUser,
);
