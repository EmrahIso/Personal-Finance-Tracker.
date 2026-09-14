import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import type { UseFormSetError } from 'react-hook-form';

import ApiError from '../../../errors/apiError';

import { toast } from 'sonner';

import login from '../api/login';

import { type LoginData } from '../../../types/auth';

const useLogin = (setError: UseFormSetError<LoginData>) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (loginData: LoginData) => login(loginData),
    onSuccess: () => {
      toast.success('Successfully logged in!');

      queryClient.invalidateQueries({
        queryKey: ['me'],
      });

      navigate('/dashboard');
    },
    onError: (error) => {
      console.log('error:', error);
      if (error instanceof ApiError) {
        if (error.code === 'VALIDATION_ERROR') {
          error.details.forEach((detail) => {
            setError(detail.path as keyof LoginData, {
              type: 'server',
              message: detail.msg,
            });
          });
        }

        toast.error(error.message);
        return;
      }

      toast.error('Something went wrong. Please try again.');
    },
  });
};

export default useLogin;
