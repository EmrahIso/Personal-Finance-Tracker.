import { toast } from 'sonner';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import register from '../api/register';

import { type RegisterData } from '../../../types/auth';

const useRegister = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (registerData: RegisterData) => register(registerData),
    onSuccess: () => {
      navigate('/login');
      toast.success('Account created successfully. Please log in.');
    },
    onError: () => {
      toast.error('Registration failed.');
    },
  });
};

export default useRegister;
