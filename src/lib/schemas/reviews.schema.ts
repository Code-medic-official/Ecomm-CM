import { useForm } from 'react-hook-form'
import { z } from 'zod'
// import { zodResolver } from '@hookform/resolvers/zod'
import { Review } from '@/payload-types'

export const ReviewsFormSchema = z.object({
  body: z.string().min(2),
})

export type ReviewsFormData = z.infer<typeof ReviewsFormSchema>

// export const useReviewsForm = (review: Review) =>
//   useForm({
//     resolver: zodResolver(ReviewsFormSchema),
//     defaultValues: {
//       body: review?.body ?? '',
//     },
//   })
