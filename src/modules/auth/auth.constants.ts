export const MIN_PASSWORD_LENGTH = 6;
export const MAX_PASSWORD_LENGTH = 16;

export const USER_NOT_AUTHORIZED_ERROR = 'Пользователь не авторизован';
export const FORBIDDEN_ROUTE_ERROR = 'У пользователя недостаточно прав';
export const USER_NOT_FOUND_ERROR = 'Пользователь не найден';
export const INVALID_PASSWORD_ERROR = 'Неверный пароль';
export const NOT_AN_EMPTY_USERNAME_ERROR =
  'Имя пользователя должно быть указано';

export const getUserAlreadyExistsError = (username: string): string =>
  `Пользователь ${username} уже существует`;
export const getPasswordIsNotInRange = (max: number, min: number): string =>
  `Пароль должен иметь от ${min} до ${max} символов`;
