import { useMutation } from '@tanstack/react-query';

import register from '../api/register';

import { type RegisterData } from '../../../types/auth';

const useRegister = () => {
  return useMutation({
    mutationFn: (registerData: RegisterData) => register(registerData),
  });
};

export default useRegister;
