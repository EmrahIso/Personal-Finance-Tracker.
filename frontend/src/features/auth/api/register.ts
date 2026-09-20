import api from '../../../utils/api';
import { type RegisterData } from '../../../types/auth';
import { type ApiResponseType } from '../../../types/global';

const register = (registerData: RegisterData) => {
  const data = api<ApiResponseType>({
    path: '/api/auth/register',
    options: {
      credentials: 'include',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: registerData.email,
        password: registerData.password,
        confirmPassword: registerData.confirmPassword,
      }),
    },
  });

  return data;
};

export default register;
