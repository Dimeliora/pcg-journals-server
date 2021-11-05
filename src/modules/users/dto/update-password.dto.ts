import { Length } from 'class-validator';

import {
  MIN_PASSWORD_LENGTH,
  MAX_PASSWORD_LENGTH,
  getPasswordIsNotInRange,
} from '../../auth/auth.constants';

export class UpdatePasswordDTO {
  @Length(MIN_PASSWORD_LENGTH, MAX_PASSWORD_LENGTH, {
    message: getPasswordIsNotInRange(MIN_PASSWORD_LENGTH, MAX_PASSWORD_LENGTH),
  })
  password: string;
}
