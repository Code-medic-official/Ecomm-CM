import { CollectionConfig } from 'payload'

export const ReviewsCollection: CollectionConfig = {
  slug: 'reviews',
  fields: [
    {
      name: 'user',
      type: 'relationship',
      relationTo: 'users',
      required: true,
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'product',
      type: 'relationship',
      relationTo: 'products',
      required: true,
      admin: { readOnly: true },
    },
    {
      name: 'body',
      type: 'textarea',
      // required: true,
    },
    { name: 'likes', type: 'relationship', relationTo: 'users', hasMany: true },
    { name: 'dislikes', type: 'relationship', relationTo: 'users', hasMany: true },
    { name: 'rating', type: 'select', options: ['1', '2', '3', '4', '5'] },
  ],
}
