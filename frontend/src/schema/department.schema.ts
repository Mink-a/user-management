import { z } from 'zod';

export const departmentTypeSchema = z.object({ name: z.string(), label: z.string() });

export type DepartmentType = z.infer<typeof departmentTypeSchema>;
