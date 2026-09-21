import { useQueryClient, useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { toast } from 'sonner';

import incomeTransaction from '../api/incomeTransaction';
import ApiError from '../../../errors/apiError';

import { type IncomeDataType } from '../schemas/transaction';
import { type UseFormSetError } from 'react-hook-form';

const useIncomeTransaction = (setError: UseFormSetError<IncomeDataType>) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: incomeTransaction,
    onSuccess: () => {
      toast.success('Income transaction created successfully.');

      queryClient.invalidateQueries({
        queryKey: ['income'],
      });

      navigate('/dashboard');
    },
    onError: (error) => {
      if (error instanceof ApiError) {
        if (error.message === 'VALIDATION_ERROR') {
          error.details.forEach((detail) => {
            setError(detail.path as keyof IncomeDataType, {
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

export default useIncomeTransaction;
