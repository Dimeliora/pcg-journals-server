import { IsNotEmpty } from 'class-validator';

import {
  NOT_AN_EMPTY_ROLE_ERROR,
  NOT_AN_EMPTY_DESCR_ERROR,
} from '../roles.constants';

export class CreateRoleDTO {
  @IsNotEmpty({ message: NOT_AN_EMPTY_ROLE_ERROR })
  value: string;

  @IsNotEmpty({ message: NOT_AN_EMPTY_DESCR_ERROR })
  description: string;
}
