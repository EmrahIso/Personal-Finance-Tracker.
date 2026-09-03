import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import login from '../api/login';

import { type LoginData } from '../../../types/auth';

const useLogin = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (loginData: LoginData) => login(loginData),
    onSuccess: () => {
      toast.success('Successfully logged in!');

      navigate('/dashboard');
    },
    onError: () => {
      toast.error('Login failed.');
    },
  });
};

export default useLogin;
