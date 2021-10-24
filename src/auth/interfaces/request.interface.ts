import { Request } from 'express';

import { SafeUser } from '../../users/interfaces/safeUser.interface';

export interface IRequestWithUser extends Request {
  user: SafeUser;
}
