import api from '../../../utils/api';

import { type ApiResponseType } from '../../../types/global';
import { type CategoryDataType } from '../schemas/category';

const postCategory = async (categoryData: CategoryDataType) => {
  const data = api<ApiResponseType>({
    path: '/api/categories',
    options: {
      credentials: 'include',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        categoryName: categoryData.categoryName,
        categoryType: categoryData.categoryType,
      }),
    },
  });

  return data;
};

export default postCategory;
