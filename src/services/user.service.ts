import { BlockUserResponse } from '../interfaces/user.interface';
import UserModel, { IUser } from '../database/models/user.model';
import { NotFoundException } from '../common/errors';

class UserService {
  async getAll(): Promise<IUser[]> {
    return UserModel.find();
  }

  async getById(id: string): Promise<IUser> {
    const user = await UserModel.findById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async blockUser(id: string, isBlocked: boolean): Promise<BlockUserResponse> {
    const user = await UserModel.findById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    user.isBlocked = isBlocked;
    await user.save();

    return { _id: user._id, isBlocked: user.isBlocked };
  }
}

export default new UserService();
