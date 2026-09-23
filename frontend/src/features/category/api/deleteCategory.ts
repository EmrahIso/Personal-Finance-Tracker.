import api from '../../../utils/api';

import { type ApiResponseType } from '../../../types/global';

const deleteCategory = async (categoryId: string) => {
  const data = api<ApiResponseType>({
    path: `/api/categories/${categoryId}`,
    options: {
      credentials: 'include',
      method: 'DELETE',
    },
  });

  return data;
};

export default deleteCategory;
