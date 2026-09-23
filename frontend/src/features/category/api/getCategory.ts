import api from '../../../utils/api';

type GetCategoryResponseType = {
  success: true;
  category: Category;
};

import { type Category } from './getCategories';

const getCategory = (categoryId: string) => {
  const data = api<GetCategoryResponseType>({
    path: `/api/categories/${categoryId}`,
    options: {
      credentials: 'include',
      method: 'GET',
    },
  });

  return data;
};

export default getCategory;
