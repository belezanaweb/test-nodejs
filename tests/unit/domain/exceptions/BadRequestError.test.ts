import { faker } from '@faker-js/faker';
import httpStatus from 'http-status';

import BadRequestError from '../../../../src/domain/exceptions/BadRequestError';

describe('BadRequestError', () => {
  it('should new bad request error #unit', () => {
    const message = faker.random.word();
    const badRequestError = new BadRequestError(message);
    expect(badRequestError.message).toEqual(message);
    expect(badRequestError.code).toEqual(httpStatus.BAD_REQUEST);
  });
});
