import { renderHook, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import ApiError from '../../../../errors/apiError';
import useLogout from '../useLogout';

import { createWrapper } from '../test-utils';

const {
  logoutMock,
  navigateMock,
  invalidateQueriesMock,
  toastSuccessMock,
  toastErrorMock,
} = vi.hoisted(() => ({
  logoutMock: vi.fn(),
  navigateMock: vi.fn(),
  invalidateQueriesMock: vi.fn(),
  toastSuccessMock: vi.fn(),
  toastErrorMock: vi.fn(),
}));

vi.mock('../../api/logout', () => ({
  default: logoutMock,
}));

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');

  return {
    ...actual,
    useNavigate: () => navigateMock,
  };
});

vi.mock('@tanstack/react-query', async () => {
  const actual = await vi.importActual('@tanstack/react-query');

  return {
    ...actual,
    useQueryClient: () => ({
      invalidateQueries: invalidateQueriesMock,
    }),
  };
});

vi.mock('sonner', () => ({
  toast: {
    success: toastSuccessMock,
    error: toastErrorMock,
  },
}));

describe('useLogout', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should logout successfully', async () => {
    logoutMock.mockResolvedValue({
      success: true,
      msg: '',
    });

    const { result } = renderHook(() => useLogout(), {
      wrapper: createWrapper(),
    });

    result.current.mutate();

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(toastSuccessMock).toHaveBeenCalledWith('Logged out successfully.');
    expect(invalidateQueriesMock).toHaveBeenCalledWith({
      queryKey: ['me'],
    });
    expect(navigateMock).toHaveBeenCalledWith('/');
  });

  it('should handle ApiError', async () => {
    logoutMock.mockRejectedValue(
      new ApiError(500, 'INTERNAL_SERVER_ERROR', 'Logout failed')
    );

    const { result } = renderHook(() => useLogout(), {
      wrapper: createWrapper(),
    });

    result.current.mutate();

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    expect(toastErrorMock).toHaveBeenCalledWith('Logout failed');
  });
});
