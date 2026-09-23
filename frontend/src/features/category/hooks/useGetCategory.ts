import { useQuery } from '@tanstack/react-query';
import getCategory from '../api/getCategory';

import ApiError from '../../../errors/apiError';

const useGetCategory = ({ categoryId }: { categoryId: string }) => {
  const query = useQuery({
    queryKey: ['category', categoryId],
    queryFn: () => getCategory(categoryId),
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
    category: isUnauthenticated ? null : query.data?.category || null,
    isLoading: query.isLoading,
    isError: query.isError && !isUnauthenticated,
    error: isUnauthenticated ? null : query.error,
  };
};

export default useGetCategory;
