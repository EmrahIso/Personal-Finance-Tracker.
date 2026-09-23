import api from '../../../utils/api';

type GetCategoriesResponseType = {
  success: true;
  categories: Category[];
};

export type Category = {
  id: string;
  name: string;
  type: 'INCOME' | 'EXPENSE';
};

const getCategories = () => {
  const data = api<GetCategoriesResponseType>({
    path: '/api/categories',
    options: {
      credentials: 'include',
      method: 'GET',
    },
  });

  return data;
};

export default getCategories;
