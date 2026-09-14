import { renderHook, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import ApiError from '../../../../errors/apiError';
import useRegister from '../useRegister';

import { createWrapper } from '../test-utils';

const { registerMock, navigateMock, toastSuccessMock, toastErrorMock } =
  vi.hoisted(() => ({
    registerMock: vi.fn(),
    navigateMock: vi.fn(),
    toastSuccessMock: vi.fn(),
    toastErrorMock: vi.fn(),
  }));

vi.mock('../../api/register', () => ({
  default: registerMock,
}));

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');

  return {
    ...actual,
    useNavigate: () => navigateMock,
  };
});

vi.mock('sonner', () => ({
  toast: {
    success: toastSuccessMock,
    error: toastErrorMock,
  },
}));

describe('useRegister', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should register successfully', async () => {
    registerMock.mockResolvedValue({
      success: true,
      msg: '',
    });

    const setError = vi.fn();

    const { result } = renderHook(() => useRegister(setError), {
      wrapper: createWrapper(),
    });

    result.current.mutate({
      email: 'test@example.com',
      password: 'password123',
      confirmPassword: 'password123',
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(navigateMock).toHaveBeenCalledWith('/login');
    expect(toastSuccessMock).toHaveBeenCalledWith(
      'Account created successfully. Please log in.'
    );
  });

  it('should handle validation error', async () => {
    registerMock.mockRejectedValue(
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

    const { result } = renderHook(() => useRegister(setError), {
      wrapper: createWrapper(),
    });

    result.current.mutate({
      email: 'bad',
      password: 'password123',
      confirmPassword: 'password123',
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
