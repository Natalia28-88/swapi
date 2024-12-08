import { z } from 'zod';

export const creationFormSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
});

export type CreationFormValues = z.infer<typeof creationFormSchema>;
