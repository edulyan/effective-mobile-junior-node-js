import { Response } from 'express';

import UserService from '../services/user.service';
import { mapUserMongoDocument } from '../database/models/user.model';
import { EffectiveMobileRequest } from '../interfaces/user.interface';

class UserController {
  async getAll(req: EffectiveMobileRequest, res: Response) {
    const users = await UserService.getAll();

    res.status(200).json(users.map(mapUserMongoDocument));
  }

  async getById({ params }: EffectiveMobileRequest, res: Response) {
    const user = await UserService.getById(params.id);

    res.status(200).json(mapUserMongoDocument(user));
  }

  async blockUser({ params, body }: EffectiveMobileRequest, res: Response) {
    const result = await UserService.blockUser(params.id, body.isBlocked);

    res.status(200).json({
      id: result._id.toString(),
      isBlocked: result.isBlocked,
    });
  }
}

export default new UserController();
