import { toast } from 'sonner';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import type { UseFormSetError } from 'react-hook-form';

import ApiError from '../../../errors/apiError';

import register from '../api/register';

import { type RegisterData } from '../../../types/auth';

const useRegister = (setError: UseFormSetError<RegisterData>) => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (registerData: RegisterData) => register(registerData),
    onSuccess: () => {
      navigate('/login');
      toast.success('Account created successfully. Please log in.');
    },
    onError: (error) => {
      if (error instanceof ApiError) {
        if (error.code === 'VALIDATION_ERROR') {
          error.details.forEach((detail) => {
            setError(detail.path as keyof RegisterData, {
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

export default useRegister;
