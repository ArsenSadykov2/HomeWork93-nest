import { UserRole } from '../schemas/user.schema';

export class RegisterUserDTO {
  username: string;
  email: string;
  role: UserRole;
  password: string;
  displayName: string;
}
