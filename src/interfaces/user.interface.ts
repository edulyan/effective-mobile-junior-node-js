import { Types } from 'mongoose';

export interface BlockUserResponse {
  _id: Types.ObjectId;
  isBlocked: boolean;
}
