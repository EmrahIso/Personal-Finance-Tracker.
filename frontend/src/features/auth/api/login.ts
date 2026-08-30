import api from '../../../utils/api';
import { type LoginData } from '../../../types/auth';

type LoginResponse = {
  success: boolean;
  msg: string;
};

const login = (loginData: LoginData) => {
  const data = api<LoginResponse>({
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
