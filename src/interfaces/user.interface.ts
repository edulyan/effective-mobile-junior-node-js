import { Request } from 'express';
import { Types } from 'mongoose';

import { UserRole } from '../models/user.model';

export interface UserJwtPayload {
  id: string;
  role: UserRole;
}

export interface EffectiveMobileRequest extends Request {
  user?: UserJwtPayload;
}

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

export interface BlockUserResponse {
  _id: Types.ObjectId;
  isBlocked: boolean;
}
