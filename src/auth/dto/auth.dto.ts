import { IsString, IsNotEmpty, Length } from 'class-validator';

import { MIN_PASSWORD_LENGTH, MAX_PASSWORD_LENGTH } from '../auth.constants';
import {
  NOT_A_STRING_ERROR,
  NOT_AN_EMPTY_ERROR,
  GET_NOT_IN_RANGE_ERROR,
} from '../../constants/validation.constants';

export class AuthDTO {
  @IsString({ message: NOT_A_STRING_ERROR })
  @IsNotEmpty({ message: NOT_AN_EMPTY_ERROR })
  username: string;

  @Length(MIN_PASSWORD_LENGTH, MAX_PASSWORD_LENGTH, {
    message: GET_NOT_IN_RANGE_ERROR(MIN_PASSWORD_LENGTH, MAX_PASSWORD_LENGTH),
  })
  @IsString({ message: NOT_A_STRING_ERROR })
  password: string;
}
