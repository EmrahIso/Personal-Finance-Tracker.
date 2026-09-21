import api from '../../../utils/api';
import { type ApiResponseType } from '../../../types/global';
import { type IncomeDataType } from '../schemas/transaction';

const incomeTransaction = (incomeData: IncomeDataType) => {
  const data = api<ApiResponseType>({
    path: '/api/transactions/income',
    options: {
      credentials: 'include',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        accountId: incomeData.accountId,
        categoryId: incomeData.categoryId,
        amount: incomeData.amount,
      }),
    },
  });

  return data;
};

export default incomeTransaction;
