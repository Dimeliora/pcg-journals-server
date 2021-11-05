export const NOT_AN_EMPTY_PCTYPE_ERROR = 'Тип должен быть указан';
export const NOT_AN_EMPTY_PCNAME_ERROR = 'Имя АРМ/сервера должно быть указано';
export const NOT_AN_EMPTY_PCPURPOSE_ERROR =
  'Назначение АРМ/сервера должно быть указано';
export const COMPUTER_NOT_FOUND = 'АРМ/сервер не найден';

export const getComputerUpdatedMessage = (pcName: string): string =>
  `Конфигурация ${pcName} изменена`;
