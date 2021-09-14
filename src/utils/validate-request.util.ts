import { Validator, setLang } from 'node-input-validator';
import { ErrorCustom } from './error-custom.util';

/**
 * Validate Request
 * @param body
 * @param rules
 */
 export const validateRequest = async (body: any, rules: any): Promise<Error | void> => {
  setLang('ptBR');
  const v = new Validator(body, rules);
  const matched = await v.check();
  if (!matched) {
    throw new ErrorCustom({
      error: v.errors,
      code: 400,
    });
  }
};
