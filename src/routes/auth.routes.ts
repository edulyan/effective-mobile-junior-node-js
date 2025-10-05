import { Router } from 'express';

import AuthController from '../controllers/auth.controller';
import { validateBody } from '../middlewares/validation.middleware';
import { userRegistrationSchema, userLoginSchema } from '../schemas/auth.schema';

export const authRouter = Router();

authRouter.post('/register', validateBody(userRegistrationSchema), AuthController.register);
authRouter.post('/login', validateBody(userLoginSchema), AuthController.login);
