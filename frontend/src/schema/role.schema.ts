import { z } from 'zod';

export const roleTypeSchema = z.object({
  name: z.string(),
  label: z.string(),
  permissions: z.array(z.coerce.number()),
  flag: z.boolean(),
});

export type RoleType = z.infer<typeof roleTypeSchema>;
