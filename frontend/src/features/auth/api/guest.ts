import api from '../../../utils/api';

type GuestResponse = {
  success: boolean;
  msg: string;
};

const guest = () => {
  const data = api<GuestResponse>({
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
