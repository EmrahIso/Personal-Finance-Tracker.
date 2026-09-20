import api from '../../../utils/api';
import { type ApiResponseType } from '../../../types/global';

const logout = () => {
  const data = api<ApiResponseType>({
    path: '/api/auth/logout',
    options: {
      credentials: 'include',
      method: 'POST',
    },
  });

  return data;
};

export default logout;
