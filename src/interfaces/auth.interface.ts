import { IUser, UserRole } from '../database/models/user.model';

export interface JwtPayload {
  id: string;
  role: UserRole;
  iat: number;
  exp: number;
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
