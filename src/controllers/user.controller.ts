import { Request, Response } from 'express';

import UserService from '../services/user.service';

class UserController {
  async getAll(req: Request, res: Response) {
    try {
      const users = await UserService.getAll();

      res.status(200).json({ users });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const user = await UserService.getById(req.params.id);

      res.status(200).json({ user });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  }
}

export default new UserController();
