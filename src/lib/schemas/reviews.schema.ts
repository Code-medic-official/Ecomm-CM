import { z } from 'zod'

export const ReviewsFormSchema = z.object({
  body: z.string().min(2),
})
