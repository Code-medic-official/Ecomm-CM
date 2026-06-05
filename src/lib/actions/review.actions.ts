'use server'

import { getPayload } from 'payload'
import config from '@payload-config'
import { Review } from '@/payload-types'
import { updateTag } from 'next/cache'
import { unstable_cache as cache } from 'next/cache'
const payload = await getPayload({ config })

enum TAGS {
  ALL = 'reviews',
}

/**
 * Queries
 */
export const createReview = async (data: Review) => {
  await payload.create({
    collection: 'reviews',
    data,
  })

  updateTag(TAGS.ALL)
}

export const updateReview = async (data: Review) => {
  await payload.update({
    collection: 'reviews',
    id: data.id,
    data,
  })

  updateTag(TAGS.ALL)
}

export const deleteReview = async (id: string) => {
  await payload.delete({
    collection: 'reviews',
    id,
  })

  updateTag(TAGS.ALL)
}

/**
 * Queries
 */

export const getReviews = cache(
  async ({ product, user }: { product?: string; user?: string }) => {
    const { docs: reviews } = await payload.find({
      collection: 'reviews',
      where: {
        or: [
          {
            product: { equals: product },
          },
          { user: { equals: user } },
        ],
      },
      depth: 1,
    })

    return reviews
  },
  [],
  { tags: [TAGS.ALL], revalidate: 60 * 15 },
)
