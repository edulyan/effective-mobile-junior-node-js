import { UserRole } from '../models/user.model';

export interface RegisterParams {
  firstName: string;
  lastName: string;
  patronymic?: string;
  birthDate: string;
  email: string;
  password: string;
  role: UserRole;
}
