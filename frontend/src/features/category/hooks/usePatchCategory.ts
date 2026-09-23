import { useMutation } from '@tanstack/react-query';
import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { type UseFormSetError } from 'react-hook-form';
import { toast } from 'sonner';

import patchCategory from '../api/patchCategory';
import ApiError from '../../../errors/apiError';
import { type CategoryDataType } from '../schemas/category';

const usePatchCategory = ({
  setError,
  categoryId,
}: {
  setError: UseFormSetError<CategoryDataType>;
  categoryId: string;
}) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: ({
      categoryData,
      categoryId,
    }: {
      categoryData: CategoryDataType;
      categoryId: string;
    }) => patchCategory({ categoryData, categoryId }),
    onSuccess: () => {
      toast.success('Successfully edited category!');

      queryClient.invalidateQueries({
        queryKey: ['categories'],
      });

      queryClient.invalidateQueries({
        queryKey: ['category', categoryId],
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

      toast.error('Something went wrong. Please try again.');
    },
  });
};

export default usePatchCategory;
