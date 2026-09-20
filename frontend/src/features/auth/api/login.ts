import api from '../../../utils/api';
import { type LoginData } from '../../../types/auth';
import { type ApiResponseType } from '../../../types/global';

const login = (loginData: LoginData) => {
  const data = api<ApiResponseType>({
    path: '/api/auth/login',
    options: {
      credentials: 'include',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: loginData.email,
        password: loginData.password,
      }),
    },
  });

  return data;
};

export default login;
