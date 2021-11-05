import { CreateRoleDTO } from '../../roles/dto/create-role.dto';

export interface IPayload {
  username: string;
  roles: CreateRoleDTO[];
}
