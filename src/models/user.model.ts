import { Document, model, Schema, Types } from 'mongoose';
import { User } from '../interfaces/auth.interface';

export const UserRoles = Object.freeze({
  ADMIN: 'admin',
  USER: 'user',
});

export type UserRole = (typeof UserRoles)[keyof typeof UserRoles];

export interface IUser extends Document {
  _id: Types.ObjectId;
  fullName: string;
  birthDate: Date;
  email: string;
  role: UserRole;
  password: string;
  isBlocked: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    fullName: {
      type: String,
      required: true,
    },
    birthDate: {
      type: Date,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    role: {
      type: String,
      enum: Object.values(UserRoles),
      default: UserRoles.USER,
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

export function mapUserMongoDocument(user: Omit<IUser, 'password'>): User {
  return {
    id: user._id.toString(),
    fullName: user.fullName,
    email: user.email,
    role: user.role,
    isBlocked: user.isBlocked,
    birthDate: user.birthDate.toISOString(),
    createdAt: user.createdAt.toISOString(),
    updatedAt: user.updatedAt.toISOString(),
  };
}

const UserModel = model<IUser>('User', UserSchema, 'users');

export default UserModel;
