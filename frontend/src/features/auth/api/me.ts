import api from '../../../utils/api';
import { type User } from '../../../types/auth';

type MeResponse = {
  success: boolean;
  user: User;
};

const me = () => {
  const data = api<MeResponse>({
    path: '/api/auth/me',
    options: {
      credentials: 'include',
      method: 'GET',
    },
  });

  return data;
};

export default me;
