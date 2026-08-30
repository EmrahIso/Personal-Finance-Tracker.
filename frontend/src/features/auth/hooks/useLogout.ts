import { useMutation } from '@tanstack/react-query';

import logout from '../api/logout';

const useLogout = () => {
  return useMutation({
    mutationFn: logout,
  });
};

export default useLogout;
