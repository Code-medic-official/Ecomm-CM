'use server'

import { getPayload } from 'payload'
import { unstable_cache as cache } from 'next/cache'

import config from '@payload-config'

const payload = await getPayload({ config })

enum TAGS {
  ALL = 'products',
}

/**
 * @Queries
 */

export const getProducts = async ({
  category,
  q,
  isFeatured,
}: {
  category?: string
  q?: string
  isFeatured?: boolean
}) => {
  try {
    const { docs: products } = await payload.find({
      collection: 'products',
      draft: false,
      overrideAccess: false,
      select: {
        title: true,
        slug: true,
        gallery: true,
        categories: true,
        priceInUSD: true,
        settings: true,
        description: true,
        featured: true,
      },
      where: {
        or: [
          { categories: { contains: category } },
          { 'categories.refCategory': { equals: category } },

          { 'settings.isFeatured': { equals: isFeatured } },

          { title: { like: q } },
          { description: { like: q } },
        ],
      },
    })

    return products
  } catch (error: any) {
    throw new Error(error)
  }
}
// export const getProducts = cache(
//   async ({ category, q, isFeatured }: { category?: string; q?: string; isFeatured?: boolean }) => {
//     try {
//       const { docs: products } = await payload.find({
//         collection: 'products',
//         where: {
//           or: [
//             { categories: { contains: category } },
//             { 'categories.refCategory': { equals: category } },

//             { 'settings.isFeatured': { equals: isFeatured } },

//             { title: { like: q } },
//             { description: { like: q } },
//           ],
//         },
//         limit: 20,
//       })

//       return products
//     } catch (error: any) {
//       throw new Error(error)
//     }
//   },
//   [],
//   {
//     tags: [TAGS.ALL],
//     revalidate: 60 * 15,
//   },
// )
