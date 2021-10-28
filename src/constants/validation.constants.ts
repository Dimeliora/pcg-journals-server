export const NOT_AN_EMPTY_ERROR = 'значение не должно быть пустым';
export const NOT_A_STRING_ERROR = 'значение должно быть строковым';
export const NOT_AN_UPPERCASE_ERROR = 'значение должно быть в верхнем регистре';

export const getNotInRangeError = (min: number, max: number) =>
  `значение должно быть не меньше ${min} и не больше ${max}`;
