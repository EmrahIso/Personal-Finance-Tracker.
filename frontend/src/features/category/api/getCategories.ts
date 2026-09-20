import api from '../../../utils/api';

type GetCategoriesResponseType = {
  categories: Category[];
};

type Category = {
  id: string;
  name: string;
  type: 'INCOME' | 'EXPENSE';
};

const getCategories = async () => {
  const data = await api<GetCategoriesResponseType>({
    path: '/api/categories',
    options: {
      credentials: 'include',
      method: 'GET',
    },
  });

  return data;
};

export default getCategories;
