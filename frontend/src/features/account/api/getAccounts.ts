import api from '../../../utils/api';

type GetAccountsResponse = {
  success: boolean;
  accounts: Account[];
};

type Account = {
  id: string;
  name: string;
  balance: number;
};

const getAccounts = () => {
  const data = api<GetAccountsResponse>({
    path: '/api/accounts',
    options: {
      credentials: 'include',
      method: 'GET',
    },
  });

  return data;
};

export default getAccounts;
