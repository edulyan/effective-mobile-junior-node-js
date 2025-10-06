import { genSalt, hash, compare } from 'bcrypt';
import { sign, SignOptions } from 'jsonwebtoken';

import UserModel from '../database/models/user.model';
import { LoginParams, RegisterParams, RegisterResponse } from '../interfaces/auth.interface';
import { ConflictException, ForbiddenException, UnauthorizedException } from '../common/errors';

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
      throw new ConflictException('Email already in use');
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

    const token = sign({ id: user._id, role: user.role }, process.env.JWT_SECRET ?? '', {
      expiresIn: process.env.JWT_EXPIRES_IN || '1d',
    } as SignOptions);

    return {
      token,
      user,
    };
  }

  async login({ email, password }: LoginParams): Promise<string> {
    const user = await UserModel.findOne({ email }).select('+password');

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    if (user.isBlocked) {
      throw new ForbiddenException('User is blocked');
    }

    const isPasswordMatch = await compare(password, user.password);
    if (!isPasswordMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const token = sign({ id: user._id, role: user.role }, process.env.JWT_SECRET ?? '', {
      expiresIn: process.env.JWT_EXPIRES_IN || '1d',
    } as SignOptions);

    return token;
  }
}

export default new AuthService();
