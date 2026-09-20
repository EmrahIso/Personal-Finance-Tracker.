import { z } from 'zod';

const categoryNameSchema = z
  .string()
  .trim()
  .min(2, 'Account name must be at least 2 characters long.')
  .max(16, 'Account name can be up to 16 characters long.');

export const categorySchema = z.object({
  categoryName: categoryNameSchema,
  categoryType: z.enum(['INCOME', 'EXPENSE'], {
    error: 'Category type is required.',
  }),
});

export type CategoryDataType = z.infer<typeof categorySchema>;
