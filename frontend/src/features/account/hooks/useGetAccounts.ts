import { useQuery } from '@tanstack/react-query';

import getAccounts from '../api/getAccounts';

import ApiError from '../../../errors/apiError';

const useGetAccounts = () => {
  const query = useQuery({
    queryKey: ['accounts'],
    queryFn: getAccounts,
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
    accounts: isUnauthenticated ? null : query.data?.accounts || null,
    isLoading: query.isLoading,
    isError: query.isError && !isUnauthenticated,
    error: isUnauthenticated ? null : query.error,
  };
};

export default useGetAccounts;
