import { z } from 'zod';

const emailSchema = z
  .email('Please enter a valid email.')
  .min(5, 'Email must be between 5 and 254 characters long.')
  .max(254, 'Email must be between 5 and 254 characters long.');

const passwordSchema = z
  .string()
  .min(8, 'Password must be between 8 and 20 characters long.')
  .max(20, 'Password must be between 8 and 20 characters long.');

const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

const registerSchema = z
  .object({
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: passwordSchema,
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: 'Passwords do not match.',
    path: ['confirmPassword'],
  });

export { loginSchema, registerSchema };
