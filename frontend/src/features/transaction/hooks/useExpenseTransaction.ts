import { useQueryClient, useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { toast } from 'sonner';

import expenseTransaction from '../api/expenseTransaction';
import ApiError from '../../../errors/apiError';

import { type ExpenseDataType } from '../schemas/transaction';
import { type UseFormSetError } from 'react-hook-form';

const useExpenseTransaction = (setError: UseFormSetError<ExpenseDataType>) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: expenseTransaction,
    onSuccess: () => {
      toast.success('Expense transaction created successfully.');

      queryClient.invalidateQueries({
        queryKey: ['expense'],
      });

      navigate('/dashboard');
    },
    onError: (error) => {
      if (error instanceof ApiError) {
        if (error.message === 'VALIDATION_ERROR') {
          error.details.forEach((detail) => {
            setError(detail.path as keyof ExpenseDataType, {
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

export default useExpenseTransaction;
