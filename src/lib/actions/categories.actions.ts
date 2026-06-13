'use server'

import { getPayload } from 'payload'

import config from '@payload-config'

const payload = await getPayload({ config })

enum TAGS {
  ALL = 'products',
}

/**
 * @Queries
 */
export const getCategories = async ({ refCategory }: { refCategory?: string }) => {
  try {
    const { docs: categories } = await payload.find({
      collection: 'categories',
      where: {
        or: [{ refCategory: { equals: refCategory } }],
      },
      limit: 20,
    })

    return categories
  } catch (error: any) {
    throw new Error(error)
  }
}
