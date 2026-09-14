import { describe, it, expect } from 'vitest';

import ApiError from './apiError';

describe('ApiError', () => {
  it('should create an ApiError with the provided values', () => {
    const error = new ApiError(
      400,
      'VALIDATION_ERROR',
      'Please check the highlighted fields.',
      []
    );

    expect(error).toBeInstanceOf(Error);
    expect(error).toBeInstanceOf(ApiError);

    expect(error.statusCode).toBe(400);
    expect(error.code).toBe('VALIDATION_ERROR');
    expect(error.message).toBe('Please check the highlighted fields.');
    expect(error.details).toEqual([]);
    expect(error.name).toBe('ApiError');
  });
});
