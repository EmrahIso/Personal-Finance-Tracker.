import { useMutation } from '@tanstack/react-query';
import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { type UseFormSetError } from 'react-hook-form';
import { toast } from 'sonner';

import postCategory from '../api/postCategory';
import ApiError from '../../../errors/apiError';
import { type CategoryDataType } from '../schemas/category';

const usePostCategory = (setError: UseFormSetError<CategoryDataType>) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: postCategory,
    onSuccess: () => {
      toast.success('Successfully created category!');

      queryClient.invalidateQueries({
        queryKey: ['categories'],
      });

      navigate('/dashboard');
    },
    onError: (error) => {
      if (error instanceof ApiError) {
        if (error.message === 'VALIDATION_ERROR') {
          error?.details.forEach((detail) => {
            setError(detail.path as keyof CategoryDataType, {});
          });
        }

        toast.error(error.message);
        return;
      }
    },
  });
};

export default usePostCategory;
