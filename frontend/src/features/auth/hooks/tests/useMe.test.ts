import { renderHook, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import ApiError from '../../../../errors/apiError';
import useMe from '../useMe';

import { createWrapper } from '../test-utils';

const { meMock } = vi.hoisted(() => ({
  meMock: vi.fn(),
}));

vi.mock('../../api/me', () => ({
  default: meMock,
}));

describe('useMe', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return user when authenticated', async () => {
    const user = {
      id: '1',
      email: 'test@example.com',
    };

    meMock.mockResolvedValue(user);

    const { result } = renderHook(() => useMe(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.user).toEqual(user);
    expect(result.current.isError).toBe(false);
  });

  it('should return null when unauthenticated', async () => {
    meMock.mockRejectedValue(
      new ApiError(401, 'UNAUTHENTICATED', 'Not authenticated')
    );

    const { result } = renderHook(() => useMe(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.user).toBeNull();
    expect(result.current.isError).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('should return error for unexpected errors', async () => {
    const error = new ApiError(
      500,
      'INTERNAL_SERVER_ERROR',
      'An unexpected error occurred.'
    );

    meMock.mockRejectedValue(error);

    const { result } = renderHook(() => useMe(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    expect(result.current.user).toBeNull();
    expect(result.current.error).toEqual(error);
  });
});
