import { z } from 'zod';

import { UserRoles } from '../models/user.model';

export const userRegistrationSchema = z.object({
  firstName: z.string().min(1).max(50),
  lastName: z.string().min(1).max(50),
  patronymic: z.string().min(1).max(50).optional(),
  email: z.email('Invalid email'),
  birthDate: z.iso.date(),
  password: z.string().min(8).max(200),
  role: z.enum(Object.values(UserRoles)).optional(),
});

export const userLoginSchema = z.object({
  email: z.email('Invalid email'),
  password: z.string().min(8).max(200),
});
