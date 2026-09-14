import { renderHook, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import ApiError from '../../../../errors/apiError';
import useLogin from '../useLogin';

import { createWrapper } from '../test-utils';

const {
  loginMock,
  navigateMock,
  invalidateQueriesMock,
  toastSuccessMock,
  toastErrorMock,
} = vi.hoisted(() => ({
  loginMock: vi.fn(),
  navigateMock: vi.fn(),
  invalidateQueriesMock: vi.fn(),
  toastSuccessMock: vi.fn(),
  toastErrorMock: vi.fn(),
}));

vi.mock('../../api/login', () => ({
  default: loginMock,
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

describe('useLogin', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should login successfully', async () => {
    loginMock.mockResolvedValue({
      success: true,
      msg: '',
    });

    const setError = vi.fn();

    const { result } = renderHook(() => useLogin(setError), {
      wrapper: createWrapper(),
    });

    result.current.mutate({
      email: 'test@example.com',
      password: 'password123',
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(toastSuccessMock).toHaveBeenCalledWith('Successfully logged in!');
    expect(invalidateQueriesMock).toHaveBeenCalledWith({
      queryKey: ['me'],
    });
    expect(navigateMock).toHaveBeenCalledWith('/dashboard');
  });

  it('should handle validation error', async () => {
    loginMock.mockRejectedValue(
      new ApiError(400, 'VALIDATION_ERROR', 'Invalid input', [
        {
          type: 'field',
          value: '',
          msg: 'Invalid email',
          path: 'email',
          location: 'body',
        },
      ])
    );

    const setError = vi.fn();

    const { result } = renderHook(() => useLogin(setError), {
      wrapper: createWrapper(),
    });

    result.current.mutate({
      email: 'bad',
      password: 'password123',
    });

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    expect(setError).toHaveBeenCalledWith('email', {
      type: 'server',
      message: 'Invalid email',
    });

    expect(toastErrorMock).toHaveBeenCalledWith('Invalid input');
  });
});
