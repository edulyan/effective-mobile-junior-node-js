import { Request, Response } from 'express';

import UserService from '../services/user.service';
import { mapUserMongoDocument } from '../models/user.model';

class UserController {
  async getAll(req: Request, res: Response) {
    try {
      const users = await UserService.getAll();

      res.status(200).json(users.map(mapUserMongoDocument));
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const user = await UserService.getById(req.params.id);

      res.status(200).json(mapUserMongoDocument(user));
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  }

  async blockUser(req: Request, res: Response) {
    try {
      const result = await UserService.blockUser(req.params.id, req.body.isBlocked);

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
