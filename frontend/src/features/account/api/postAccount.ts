import api from '../../../utils/api';
import { type AccountDataOutput } from '../schemas/account';
import { type ApiResponseType } from '../../../types/global';

const postAccount = (accountData: AccountDataOutput) => {
  const data = api<ApiResponseType>({
    path: '/api/accounts',
    options: {
      credentials: 'include',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        accountName: accountData.accountName,
        initialBalance: accountData.initialBalance,
      }),
    },
  });

  return data;
};

export default postAccount;
