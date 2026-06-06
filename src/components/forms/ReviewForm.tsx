'use client'

import { Review } from '@/payload-types'
import React, { ComponentProps, useState, useTransition } from 'react'
import { Textarea } from '../ui/textarea'
import Heading from '../custom/Heading'
import { MessageCircleHeartIcon, MessageSquareMore, PenTool, Star } from 'lucide-react'
import { Button } from '../ui/button'
import { createReview } from '@/lib/actions/review.actions'
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from '../ui/dialog'
import { AnimatePresence, motion } from 'motion/react'
import { Spinner } from '../ui/spinner'
import { toast } from 'sonner'

type IRating = Review['rating']

export default function ReviewForm() {
  const [body, setBody] = useState<string>()
  // const [rating, setRating] = useState<0 | 1 | 2 | 3 | 4 | 5>(0)
  const [rating, setRating] = useState<number>(0)

  const [showBody, setShowBody] = useState<boolean>(false)
  const [isPending, startTransition] = useTransition()

  console.log(rating)

  const submitHandler = () => {
    const cleanData: Review = {
      body,
      rating: `${rating}`,
    }

    startTransition(async () => {
      await createReview(cleanData)

      toast.success('Review submitted 👍')
    })
  }

  return (
    <div className="space-y-4">
      <AnimatePresence>
        {showBody && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            layout
          >
            <Heading className="mb-2">
              <MessageSquareMore />
              Review
            </Heading>
            <Textarea
              onChange={(e) => setBody(e.target.value)}
              value={body}
              placeholder="What do you think about this product?"
              className="text-sm"
            />
          </motion.div>
        )}
      </AnimatePresence>

      <div>
        <Heading className="text-xl">
          <Star />
          Rating
        </Heading>
        <div className="flex items-center gap-x-2 justify-center">
          {[...Array(5)].map((_, i) => (
            // <Button size={'icon-lg'} variant={'ghost'} className="text-3xl!" key={i}>
            <Star
              size={30}
              fill={rating >= i + 1 ? 'yellow' : 'transparent'}
              stroke={rating >= i + 1 ? 'yellow' : 'gray'}
              onClick={() => setRating(i + 1)}
              className="cursor-pointer hover:text-muted"
            />
            // </Button>
          ))}
        </div>
      </div>

      <div className="w-full flex items-center justify-between">
        <Button
          variant={'secondary'}
          onClick={() => setShowBody((prev) => !prev)}
          size={'lg'}
          className={'flex'}
        >
          <PenTool />
          Write Review
        </Button>
        <Button onClick={submitHandler} disabled={isPending} size={'lg'} className={''}>
          Submit {isPending && <Spinner />}
        </Button>
      </div>
    </div>
  )
}

ReviewForm.Trigger = (props: ComponentProps<typeof Button>) => {
  return (
    <Dialog>
      <DialogTrigger
        render={
          <Button {...props} variant="secondary">
            {props.children ? (
              props.children
            ) : (
              <>
                <Star /> Rate
              </>
            )}
          </Button>
        }
      />

      <DialogContent>
        {/* <DialogHeader>
          
        </DialogHeader> */}

        <ReviewForm />
      </DialogContent>
    </Dialog>
  )
}
