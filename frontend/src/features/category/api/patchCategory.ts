import api from '../../../utils/api';

import { type ApiResponseType } from '../../../types/global';
import { type CategoryDataType } from '../schemas/category';

const patchCategory = async ({
  categoryData,
  categoryId,
}: {
  categoryData: CategoryDataType;
  categoryId: string;
}) => {
  const data = api<ApiResponseType>({
    path: `/api/categories/${categoryId}`,
    options: {
      credentials: 'include',
      method: 'PATCH',
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

export default patchCategory;
