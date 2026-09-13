import { describe, expect, it } from 'vitest';
import AppError from '../../../src/errors/AppError.js';

describe('AppError', () => {
  it('should create an error with status code, code, and message', () => {
    const error = new AppError(
      401,
      'UNAUTHENTICATED',
      'Authentication required.'
    );

    expect(error).toBeInstanceOf(Error);
    expect(error).toBeInstanceOf(AppError);

    expect(error.statusCode).toBe(401);
    expect(error.code).toBe('UNAUTHENTICATED');
    expect(error.message).toBe('Authentication required.');
  });
});
