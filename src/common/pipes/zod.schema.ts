import { z } from 'zod';

export const createCatSchema = z
  .object({
    name: z.string(),
    email: z.email(),
    role: z.enum(['ADMIN', 'ENGINEER', 'INTERN']),
  })
  .required();

export type CreateCatDto = z.infer<typeof createCatSchema>;
