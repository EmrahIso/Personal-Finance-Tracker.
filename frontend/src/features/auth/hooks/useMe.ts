import { useQuery } from '@tanstack/react-query';

import me from '../api/me';
import ApiError from '../../../errors/apiError';

const useMe = () => {
  const query = useQuery({
    queryKey: ['me'],
    queryFn: me,
    retry: (failureCount, error) => {
      if (error instanceof ApiError && error.statusCode === 401) {
        return false;
      }

      return failureCount < 2;
    },
  });

  const isUnauthenticated =
    query.error instanceof ApiError && query.error.statusCode === 401;

  return {
    user: isUnauthenticated ? null : query.data || null,
    isLoading: query.isLoading,
    isError: query.isError && !isUnauthenticated,
    error: isUnauthenticated ? null : query.error,
  };
};

export default useMe;
