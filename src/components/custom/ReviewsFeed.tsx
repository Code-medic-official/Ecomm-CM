import { Review } from '@/payload-types'
import { ComponentProps } from 'react'
import { AnimatedTestimonials } from '../ui/animated-testimonials'

export default function ReviewsFeed({
  reviews,
  ...props
}: { reviews: Review[] } & ComponentProps<'div'>) {
  if (reviews.length < 1) return

  return (
    <div {...props}>
      <AnimatedTestimonials testimonials={reviews} autoplay />
    </div>
  )
}
