import { z } from 'zod';

export const createEmployeeSchema = z
  .object({
    name: z.string(),
    email: z.email(),
    role: z.enum(['ADMIN', 'ENGINEER', 'INTERN']),
  })
  .required();

export type createEmployeeDto = z.infer<typeof createEmployeeSchema>;
