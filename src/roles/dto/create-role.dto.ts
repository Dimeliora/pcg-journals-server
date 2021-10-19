import { IsString, IsUppercase, IsNotEmpty } from 'class-validator';

import {
  NOT_AN_EMPTY_ERROR,
  NOT_A_STRING_ERROR,
  NOT_AN_UPPERCASE_ERROR,
} from '../../constants/validation.constants';

export class CreateRoleDTO {
  @IsUppercase({ message: NOT_AN_UPPERCASE_ERROR })
  @IsNotEmpty({ message: NOT_AN_EMPTY_ERROR })
  @IsString({ message: NOT_A_STRING_ERROR })
  value: string;

  @IsNotEmpty({ message: NOT_AN_EMPTY_ERROR })
  @IsString({ message: NOT_A_STRING_ERROR })
  description: string;
}
