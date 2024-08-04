import { z } from 'zod';

export const permissionTypeSchema = z.object({
  name: z.string(),
  label: z.string(),
  flag: z.boolean(),
});

export type PermissionType = z.infer<typeof permissionTypeSchema>;
