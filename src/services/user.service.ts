import UserModel, { IUser } from '../models/user.model';

class UserService {
  async getAll(): Promise<IUser[]> {
    return UserModel.find();
  }

  async getById(id: string): Promise<IUser> {
    const user = await UserModel.findById(id);
    if (!user) {
      throw new Error('User not found');
    }

    return user;
  }
}

export default new UserService();
