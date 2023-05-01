import { faker } from '@faker-js/faker';
import httpStatus from 'http-status';

import NotFoundError from '../../../../src/domain/exceptions/NotFoundError';

describe('NotFoundError', () => {
  it('should new not found error #unit', () => {
    const message = faker.random.word();
    const badRequestError = new NotFoundError(message);
    expect(badRequestError.message).toEqual(message);
    expect(badRequestError.code).toEqual(httpStatus.NOT_FOUND);
  });
});
