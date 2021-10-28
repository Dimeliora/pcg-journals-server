import { IsString, Length } from 'class-validator';

import {
  NOT_A_STRING_ERROR,
  getNotInRangeError,
} from '../../constants/validation.constants';
import {
  MIN_PASSWORD_LENGTH,
  MAX_PASSWORD_LENGTH,
} from '../../auth/auth.constants';

export class UpdatePasswordDTO {
  @Length(MIN_PASSWORD_LENGTH, MAX_PASSWORD_LENGTH, {
    message: getNotInRangeError(MIN_PASSWORD_LENGTH, MAX_PASSWORD_LENGTH),
  })
  @IsString({ message: NOT_A_STRING_ERROR })
  password: string;
}
