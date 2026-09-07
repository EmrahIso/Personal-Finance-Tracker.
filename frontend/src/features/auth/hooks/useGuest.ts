import { toast } from 'sonner';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import guest from '../api/guest';

const useGuest = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: guest,
    onSuccess: () => {
      toast.success('Guest account created successfully.');

      queryClient.invalidateQueries({
        queryKey: ['me'],
      });

      navigate('/dashboard');
    },
    onError: () => {
      toast.error('Guest registration failed.');
    },
  });
};

export default useGuest;
