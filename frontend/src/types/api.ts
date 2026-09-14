type ApiErrorDetails = {
  type: string;
  value: unknown;
  msg: string;
  path: string;
  location: string;
};

type ApiErrorResponse = {
  success: false;
  error: {
    code: string;
    message: string;
    details?: ApiErrorDetails[];
  };
};

const isApiErrorResponse = (data: unknown): data is ApiErrorResponse => {
  if (typeof data !== 'object' || data === null) {
    return false;
  }

  const errorData = data as Record<string, unknown>;

  if (typeof errorData.error !== 'object' || errorData.error === null) {
    return false;
  }

  const error = errorData.error as Record<string, unknown>;

  return (
    errorData.success === false &&
    typeof error.code === 'string' &&
    typeof error.message === 'string'
  );
};

export { isApiErrorResponse, type ApiErrorDetails };
