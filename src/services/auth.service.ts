import { genSalt, hash, compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';

import UserModel from '../models/user.model';
import { LoginParams, RegisterParams, RegisterResponse } from '../interfaces/auth.interface';

class AuthService {
  async register({
    firstName,
    lastName,
    patronymic,
    birthDate,
    email,
    password,
    role,
  }: RegisterParams): Promise<RegisterResponse> {
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
      user,
    };
  }

  async login({ email, password }: LoginParams): Promise<string> {
    const user = await UserModel.findOne({ email }).select('+password');

    if (!user) {
      throw new Error('Invalid credentials');
    }

    if (user.isBlocked) {
      throw new Error('User is blocked');
    }

    const isPasswordMatch = await compare(password, user.password);
    if (!isPasswordMatch) {
      throw new Error('Invalid credentials');
    }

    const token = sign({ id: user._id, role: user.role }, process.env.JWT_SECRET ?? '');

    return token;
  }
}

export default new AuthService();
