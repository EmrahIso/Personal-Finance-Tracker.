import { useQuery } from '@tanstack/react-query';

import me from '../api/me';

const useMe = () => {
  const query = useQuery({
    queryKey: ['me'],
    queryFn: me,
  });

  return {
    user: query.data?.user ?? null,
    isLoading: query.isLoading,
    isError: query.isError,
  };
};

export default useMe;
