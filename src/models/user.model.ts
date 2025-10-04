import { Document, model, Schema } from 'mongoose';

export const UserRoles = Object.freeze({
  ADMIN: 'admin',
  USER: 'user',
});

export type UserRole = (typeof UserRoles)[keyof typeof UserRoles];

export interface User extends Document {
  id: string;
  fullName: string;
  birthDate: Date;
  email: string;
  role: UserRole;
  password: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<User>(
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
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

const UserModel = model<User>('User', UserSchema, 'users');

export default UserModel;
