import { FixedToolbarFeature, lexicalEditor } from '@payloadcms/richtext-lexical'
import { Field } from 'payload'

export const FeatureProductFields: Field[] = [
  {
    name: 'banner',
    type: 'upload',
    relationTo: 'media',
    admin: {
      description:
        'Marketing image of your product which will be used to feature templates. Defaults to main product image.',
    },
  },
  {
    name: 'shortDescription',
    type: 'richText',
    admin: { description: 'A straight-forward reason for customers to buy this product.' },
  },
  {
    name: 'longDescription',
    type: 'richText',
    editor: lexicalEditor({
      features: ({ rootFeatures }) => [...rootFeatures, FixedToolbarFeature()],
    }),
    admin: {
      description:
        "Elaborate description for customers to buy this product. Eg: why it's featured, product details, why you recommend it...",
    },
  },
  {
    name: 'expiry',
    type: 'date',
    admin: {
      description:
        'When do you want to stop featuring this product? Defaults to "Indefinitely"; till featuring is manually disabled.',
    },
  },
]
