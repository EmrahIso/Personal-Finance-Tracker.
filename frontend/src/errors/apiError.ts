import { type ApiErrorDetails } from '../types/api';

class ApiError extends Error {
  statusCode: number;
  code: string;
  details: ApiErrorDetails[];

  constructor(
    statusCode: number,
    code: string,
    message: string,
    details: ApiErrorDetails[] = []
  ) {
    super(message);

    this.name = 'ApiError';
    this.statusCode = statusCode;
    this.code = code;
    this.details = details;
  }
}

export default ApiError;
