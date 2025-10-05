import { Request, Response } from 'express';

import AuthService from '../services/auth.service';
import { mapUserMongoDocument } from '../models/user.model';

class AuthController {
  async register(req: Request, res: Response) {
    try {
      const result = await AuthService.register(req.body);

      res.status(201).json({ ...result, user: mapUserMongoDocument(result.user) });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const token = await AuthService.login(req.body);

      res.status(200).json({ token });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  }
}

export default new AuthController();
