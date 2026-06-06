import { Field } from 'payload'

export const ProductSettings: Field[] = [
  {
    name: 'reviews',
    type: 'group',
    fields: [
      {
        name: 'allowReviews',
        type: 'checkbox',
        defaultValue: true,
        admin: {
          description: 'Allow Customers to write reviews & rate this product.',
        },
      },
      {
        name: 'hideReviews',
        type: 'checkbox',
        defaultValue: false,
        admin: {
          description: 'Hide all existing customer reviews & ratings for this product.',
        },
      },
    ],
  },
  {
    name: 'discount',
    label: 'Discount(%)',
    type: 'number',
    min: 1,
    max: 100,
    admin: {
      description:
        "This is percentage by which you wish to discount/lower the selling price of this product. This will also be applied to ALL the product's variant prices",
      placeholder: 'Enter percentage discount (1-100)%...',
    },
  },
  {
    name: 'isFeatured',
    label: 'Feature product✨',
    type: 'checkbox',
    defaultValue: false,
    admin: {
      description:
        'Featured products are automatically prioritized & appear on Feature Templates.\n If enabled, a "Featured✨" tab will appear next to the SEO-Tab.',
    },
  },
]
