import { renderHook, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import ApiError from '../../../../errors/apiError';
import useGuest from '../useGuest';

import { createWrapper } from '../test-utils';

const {
  guestMock,
  navigateMock,
  invalidateQueriesMock,
  toastSuccessMock,
  toastErrorMock,
} = vi.hoisted(() => ({
  guestMock: vi.fn(),
  navigateMock: vi.fn(),
  invalidateQueriesMock: vi.fn(),
  toastSuccessMock: vi.fn(),
  toastErrorMock: vi.fn(),
}));

vi.mock('../../api/guest', () => ({
  default: guestMock,
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

describe('useGuest', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should create guest successfully', async () => {
    guestMock.mockResolvedValue({
      success: true,
      msg: '',
    });

    const { result } = renderHook(() => useGuest(), {
      wrapper: createWrapper(),
    });

    result.current.mutate();

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(toastSuccessMock).toHaveBeenCalledWith(
      'Guest account created successfully.'
    );
    expect(invalidateQueriesMock).toHaveBeenCalledWith({
      queryKey: ['me'],
    });
    expect(navigateMock).toHaveBeenCalledWith('/dashboard');
  });

  it('should handle ApiError', async () => {
    guestMock.mockRejectedValue(
      new ApiError(500, 'INTERNAL_SERVER_ERROR', 'Something went wrong')
    );

    const { result } = renderHook(() => useGuest(), {
      wrapper: createWrapper(),
    });

    result.current.mutate();

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    expect(toastErrorMock).toHaveBeenCalledWith('Something went wrong');
  });
});
