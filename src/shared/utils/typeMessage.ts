import { ErrorReport, ValidationError, ValidationErrorItem } from 'joi';

const message = (err: ErrorReport[], field: string): any =>
  new ValidationError(TypeError(err, field), ErrorItem(err[0]), err);

const TypeError = (err: ErrorReport[], field: string): string => {
  const { code, local } = err[0];

  switch (code) {
    case 'any.only':
      return field;
    case 'any.required':
      return `${field} is a required field.`;
    case 'number.base':
      return `${field} must be a number.`;
    case 'string.base':
      return `${field} must be a text.`;
    case 'number.min':
      return `${field} must has a min value (${local.limit}).`;
    case 'number.max':
      return `${field} must has a max value (${local.limit}).`;
    default:
      return `An error occurred in the ${field} field`;
  }
};

const ErrorItem = (err: ErrorReport): ValidationErrorItem[] => {
  return [
    {
      message: err.message,
      path: err.path,
      type: err.code,
    },
  ];
};

export default message;
