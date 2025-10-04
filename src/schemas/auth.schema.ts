import { z } from 'zod';

import { UserRoles } from '../models/user.model';

export const registartionSchema = z.object({
  firstName: z.string().min(1).max(50),
  lastName: z.string().min(1).max(50),
  patronymic: z.string().min(1).max(50).optional(),
  email: z.email(),
  birthDate: z.date(),
  password: z.string().min(8).max(200),
  role: z.enum(Object.values(UserRoles)).optional(),
});
