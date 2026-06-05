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
          description:
            "Hide all existing customer reviews & ratings for this product. This will also be applied to ALL the product's variant prices",
        },
      },
    ],
  },
  {
    name: 'discount',
    label: 'Price Discount',
    type: 'number',
    min: 1,
    max: 100,
    admin: {
      description:
        'This is percentage by which you wish to discount/lower the selling price of this product.',
      placeholder: 'Enter percentage discount (1-100)%...',
    },
  },
]
