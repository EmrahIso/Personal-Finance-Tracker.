import { describe, expect, it, vi } from 'vitest';

import api from './api';
import ApiError from '../errors/apiError';

describe('api', () => {
  it('should return data when request is successful', async () => {
    const responseData = {
      success: true,
      user: {
        id: '1',
        email: 'test@example.com',
      },
    };

    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(
        new Response(JSON.stringify(responseData), {
          status: 200,
          headers: {
            'Content-Type': 'application/json',
          },
        })
      )
    );

    const result = await api<typeof responseData>({
      path: '/api/auth/me',
    });

    expect(result).toEqual(responseData);
  });

  it('should throw ApiError for a valid API error response', async () => {
    const errorResponse = {
      success: false,
      error: {
        code: 'VALIDATION_ERROR',
        message: 'Please check the highlighted fields.',
        details: [
          {
            type: 'field',
            value: '',
            msg: 'Email is required.',
            path: 'email',
            location: 'body',
          },
        ],
      },
    };

    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(
        new Response(JSON.stringify(errorResponse), {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
          },
        })
      )
    );

    const promise = api({
      path: '/api/auth/register',
    });

    await expect(promise).rejects.toBeInstanceOf(ApiError);

    await expect(promise).rejects.toMatchObject({
      statusCode: 400,
      code: 'VALIDATION_ERROR',
      message: 'Please check the highlighted fields.',
      details: errorResponse.error.details,
    });
  });

  it('should throw ApiError for invalid credentials without details', async () => {
    const errorResponse = {
      success: false,
      error: {
        code: 'INVALID_CREDENTIALS',
        message: 'Invalid email or password.',
      },
    };

    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(
        new Response(JSON.stringify(errorResponse), {
          status: 401,
          headers: {
            'Content-Type': 'application/json',
          },
        })
      )
    );

    const promise = api({
      path: '/api/auth/login',
    });

    await expect(promise).rejects.toMatchObject({
      statusCode: 401,
      code: 'INVALID_CREDENTIALS',
      message: 'Invalid email or password.',
      details: [],
    });
  });

  it('should throw UNKNOWN_ERROR for an unexpected API error response', async () => {
    const response = {
      something: 'unexpected',
    };

    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(
        new Response(JSON.stringify(response), {
          status: 500,
        })
      )
    );

    const promise = api({
      path: '/api/test',
    });

    await expect(promise).rejects.toMatchObject({
      statusCode: 500,
      code: 'UNKNOWN_ERROR',
      message: 'Something went wrong',
      details: [],
    });
  });

  it('should propagate network errors', async () => {
    const networkError = new TypeError('Failed to fetch');

    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(networkError));

    await expect(
      api({
        path: '/api/test',
      })
    ).rejects.toBe(networkError);
  });

  it('should make a request with credentials included', async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(
        JSON.stringify({
          success: true,
        }),
        {
          status: 200,
        }
      )
    );

    vi.stubGlobal('fetch', fetchMock);

    await api({
      path: '/api/auth/me',
    });

    expect(fetchMock).toHaveBeenCalledWith(
      expect.stringContaining('/api/auth/me'),
      expect.objectContaining({
        credentials: 'include',
      })
    );
  });
});
