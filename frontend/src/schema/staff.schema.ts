import { z } from 'zod';

export const staffSchema = z.object({
  name: z.string(),
  email: z.string(),
  mobile: z.string(),
  age: z.number(),
  gender: z.string(),
  code: z.string(),
  position: z.string(),
  depId: z.coerce.number(),
  joinedDate: z.string(),
  createdBy: z.coerce.number(),
  updatedBy: z.coerce.number(),
  status: z.string(),
});

export type StaffType = z.infer<typeof staffSchema>;
