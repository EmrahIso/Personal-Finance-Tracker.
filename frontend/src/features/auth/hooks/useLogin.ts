import { useMutation } from '@tanstack/react-query';

import login from '../api/login';

import { type LoginData } from '../../../types/auth';

const useLogin = () => {
  return useMutation({
    mutationFn: (loginData: LoginData) => login(loginData),
  });
};

export default useLogin;
