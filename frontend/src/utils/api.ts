import ApiError from '../errors/apiError';
import { isApiErrorResponse } from '../types/api';

type ApiProps = {
  path: string;
  options?: RequestInit;
};

const API_URL = import.meta.env.VITE_API_URL;

const api = async <T>({ path, options }: ApiProps): Promise<T> => {
  const response = await fetch(`${API_URL}${path}`, {
    credentials: 'include',
    ...options,
  });

  const data: unknown = await response.json();

  if (!response.ok) {
    if (isApiErrorResponse(data)) {
      throw new ApiError(
        response.status,
        data.error.code,
        data.error.message,
        data.error.details
      );
    }

    throw new ApiError(
      response.status,
      'UNKNOWN_ERROR',
      'Something went wrong'
    );
  }

  return data as T;
};

export default api;
