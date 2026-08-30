import api from '../../../utils/api';

type LogoutResponse = {
  success: boolean;
  msg: string;
};

const logout = () => {
  const data = api<LogoutResponse>({
    path: '/api/auth/logout',
    options: {
      credentials: 'include',
      method: 'POST',
    },
  });

  return data;
};

export default logout;
