import { useMutation } from '@tanstack/react-query';
import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { toast } from 'sonner';

import deleteCategory from '../api/deleteCategory';
import ApiError from '../../../errors/apiError';

const useDeleteCategory = (categoryId: string) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (categoryId: string) => deleteCategory(categoryId),
    onSuccess: () => {
      toast.success('Successfully deleted category!');

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
        toast.error(error.message);
        return;
      }

      toast.error('Something went wrong. Please try again.');
    },
  });
};

export default useDeleteCategory;
