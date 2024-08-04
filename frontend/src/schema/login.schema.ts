import { z } from 'zod';

export type Login = z.infer<typeof loginSchema>;

export type LoginResponse = {
  user: IUser;
  access_token: string;
  refresh_token: string;
};

export const loginSchema = z.object({
  email: z.string().email().min(3, { message: 'Email must be at least 3 characters' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
});
