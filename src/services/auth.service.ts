import { genSalt, hash } from 'bcrypt';
import { sign } from 'jsonwebtoken';

import UserModel from '../models/user.model';
import { RegisterParams } from '../interfaces/auth.interface';

class AuthService {
  async register({ firstName, lastName, patronymic, birthDate, email, password, role }: RegisterParams) {
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      throw new Error('Email already in use');
    }

    const salt = await genSalt(10);
    const passwordHash = await hash(password, salt);

    const fullName = `${lastName} ${firstName} ${patronymic ? patronymic : ''}`.trim();

    const user = await UserModel.create({
      fullName,
      birthDate: new Date(birthDate),
      email,
      password: passwordHash,
      role,
    });

    const token = sign({ id: user._id, role: user.role }, process.env.JWT_SECRET ?? '');

    return {
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        isBlocked: user.isBlocked,
      },
    };
  }

  async login() {}
}

export default new AuthService();
