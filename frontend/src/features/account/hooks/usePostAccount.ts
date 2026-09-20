import { useMutation } from '@tanstack/react-query';
import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { type UseFormSetError } from 'react-hook-form';

import { toast } from 'sonner';

import postAccount from '../api/postAccount';

import ApiError from '../../../errors/apiError';
import type { AccountDataOutput } from '../schemas/account';

const usePostAccount = (setError: UseFormSetError<AccountDataOutput>) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: postAccount,
    onSuccess: () => {
      toast.success('Successfully created account!');

      queryClient.invalidateQueries({
        queryKey: ['accounts'],
      });

      navigate('/dashboard');
    },
    onError: (error) => {
      if (error instanceof ApiError) {
        if (error.code === 'VALIDATION_ERROR') {
          error.details.forEach((detail) => {
            setError(detail.path as keyof AccountDataOutput, {
              type: 'server',
              message: detail.msg,
            });
          });
        }

        toast.error(error.message);
        return;
      }
    },
  });
};

export default usePostAccount;
