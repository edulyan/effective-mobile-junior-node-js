import UserModel from '../models/user.model';

class UserService {
  async getAll() {
    return UserModel.find();
  }

  async getById(id: string) {
    const user = await UserModel.findById(id);
    if (!user) {
      throw new Error('User not found');
    }

    return user;
  }
}

export default new UserService();
