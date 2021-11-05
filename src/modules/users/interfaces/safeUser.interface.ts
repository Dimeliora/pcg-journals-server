import { User } from '../schemas/user.schema';

export type SafeUser = Omit<User, 'passwordHash'>;
