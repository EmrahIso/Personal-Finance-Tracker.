import { z } from 'zod';

const accountNameSchema = z
  .string()
  .trim()
  .min(5, 'Account name must be at least 5 characters long.')
  .max(25, 'Account name can be up to 25 characters long.');

const initialBalanceSchema = z.coerce
  .number({ message: 'Initial income must be a number' })
  .min(0, 'Initial income cannot be negative');

export const accountSchema = z.object({
  accountName: accountNameSchema,
  initialBalance: initialBalanceSchema,
});

export type AccountDataInput = z.input<typeof accountSchema>;
export type AccountDataOutput = z.output<typeof accountSchema>;
