import { Router } from 'express';

import AuthController from '../controllers/auth.controller';
import { validateData } from '../middlewares/validation.middleware';
import { userRegistrationSchema } from '../schemas/auth.schema';

export const authRouter = Router();

authRouter.post('/register', validateData(userRegistrationSchema), AuthController.register);
