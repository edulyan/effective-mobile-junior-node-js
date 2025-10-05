import { Request, Response } from 'express';

import AuthService from '../services/auth.service';
import { mapUserMongoDocument } from '../database/models/user.model';

class AuthController {
  async register({ body }: Request, res: Response) {
    const result = await AuthService.register(body);

    res.status(201).json({ ...result, user: mapUserMongoDocument(result.user) });
  }

  async login({ body }: Request, res: Response) {
    const token = await AuthService.login(body);

    res.status(200).json({ token });
  }
}

export default new AuthController();
