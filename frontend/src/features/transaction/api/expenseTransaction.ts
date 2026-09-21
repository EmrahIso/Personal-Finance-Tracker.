import api from '../../../utils/api';
import { type ApiResponseType } from '../../../types/global';
import { type ExpenseDataType } from '../schemas/transaction';

const expenseTransaction = (expenseData: ExpenseDataType) => {
  const data = api<ApiResponseType>({
    path: '/api/transactions/expense',
    options: {
      credentials: 'include',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        accountId: expenseData.accountId,
        categoryId: expenseData.categoryId,
        amount: expenseData.amount,
      }),
    },
  });

  return data;
};

export default expenseTransaction;
