import { IUser, UserRole } from '../models/user.model';

export interface User {
  id: string;
  fullName: string;
  email: string;
  role: UserRole;
  isBlocked: boolean;
  birthDate: string;
  createdAt: string;
  updatedAt: string;
}

export interface RegisterParams {
  firstName: string;
  lastName: string;
  patronymic?: string;
  birthDate: string;
  email: string;
  password: string;
  role: UserRole;
}

export interface RegisterResponse {
  token: string;
  user: Omit<IUser, 'password'>;
}

export interface LoginParams {
  email: string;
  password: string;
}
