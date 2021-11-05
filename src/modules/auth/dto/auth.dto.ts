import { IsNotEmpty, Length } from 'class-validator';

import {
  MIN_PASSWORD_LENGTH,
  MAX_PASSWORD_LENGTH,
  NOT_AN_EMPTY_USERNAME_ERROR,
  getPasswordIsNotInRange,
} from '../auth.constants';

export class AuthDTO {
  @IsNotEmpty({ message: NOT_AN_EMPTY_USERNAME_ERROR })
  username: string;

  @Length(MIN_PASSWORD_LENGTH, MAX_PASSWORD_LENGTH, {
    message: getPasswordIsNotInRange(MIN_PASSWORD_LENGTH, MAX_PASSWORD_LENGTH),
  })
  password: string;
}
