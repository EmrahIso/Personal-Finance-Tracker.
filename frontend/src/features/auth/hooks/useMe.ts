import { useQuery } from '@tanstack/react-query';

import me from '../api/me';

const useMe = () => {
  return useQuery({
    queryKey: ['me'],
    queryFn: me,
  });
};

export default useMe;
