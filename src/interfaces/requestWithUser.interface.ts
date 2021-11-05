import { Request } from 'express';

import { SafeUser } from '../modules/users/interfaces/safeUser.interface';

export interface IRequestWithUser extends Request {
  user: SafeUser;
}
