import { toast } from 'sonner';

import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import logout from '../api/logout';

import ApiError from '../../../errors/apiError';

const useLogout = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      toast.success('Logged out successfully.');

      queryClient.invalidateQueries({
        queryKey: ['me'],
      });

      navigate('/');
      window.location.reload();
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

export default useLogout;
