import { z } from 'zod';

export const incomeSchema = z.object({
  accountId: z.string().min(1, 'Please select an account.'),
  categoryId: z.string().min(1, 'Please select a category.'),
  amount: z
    .number({
      error: 'Please enter an amount.',
    })
    .refine((n) => n > 0, {
      message: 'Amount must be greater than 0.',
    }),
});

export type IncomeDataType = z.infer<typeof incomeSchema>;

export const expenseSchema = z.object({
  accountId: z.string().min(1, 'Please select an account.'),
  categoryId: z.string().min(1, 'Please select a category.'),
  amount: z
    .number({
      error: 'Please enter an amount.',
    })
    .refine((n) => n > 0, {
      message: 'Amount must be greater than 0.',
    }),
});

export type ExpenseDataType = z.infer<typeof expenseSchema>;
