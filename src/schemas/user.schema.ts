import mongoose from 'mongoose';
import { z } from 'zod';

export const mongoIdSchema = z.object({
  id: z.string().refine((id) => mongoose.Types.ObjectId.isValid(id), {
    message: 'Invalid MongoDB ObjectId',
  }),
});
