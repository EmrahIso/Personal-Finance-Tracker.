import { useQuery } from '@tanstack/react-query';
import getCategories from '../api/getCategories';

import ApiError from '../../../errors/apiError';

const useGetCategories = () => {
  const query = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
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
    categories: isUnauthenticated ? null : query.data?.categories || null,
    isLoading: query.isLoading,
    isError: query.isError && !isUnauthenticated,
    error: isUnauthenticated ? null : query.error,
  };
};

export default useGetCategories;
