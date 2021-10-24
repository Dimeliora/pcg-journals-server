import { User } from '../../users/schemas/user.schema';

export interface IAuthentication {
  access_token: string;
  user: Omit<User, 'passwordHash'>;
}
