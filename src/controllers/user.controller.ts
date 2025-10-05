import { Response } from 'express';

import UserService from '../services/user.service';
import { mapUserMongoDocument } from '../models/user.model';
import { EffectiveMobileRequest } from '../interfaces/user.interface';

class UserController {
  async getAll(req: EffectiveMobileRequest, res: Response) {
    try {
      const users = await UserService.getAll();

      res.status(200).json(users.map(mapUserMongoDocument));
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  }

  async getById({ params }: EffectiveMobileRequest, res: Response) {
    try {
      const user = await UserService.getById(params.id);

      res.status(200).json(mapUserMongoDocument(user));
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  }

  async blockUser({ params, body }: EffectiveMobileRequest, res: Response) {
    try {
      const result = await UserService.blockUser(params.id, body.isBlocked);

      res.status(200).json({
        id: result._id.toString(),
        isBlocked: result.isBlocked,
      });
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  }
}

export default new UserController();
