import api from '../../../utils/api';
import { type ApiResponseType } from '../../../types/global';

const guest = () => {
  const data = api<ApiResponseType>({
    path: '/api/auth/guest',
    options: {
      credentials: 'include',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  });

  return data;
};

export default guest;
