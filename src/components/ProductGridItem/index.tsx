import type { Product } from '@/payload-types'

import { Media } from '@/components/Media'
import { Price } from '@/components/Price'
import clsx from 'clsx'
import Link from 'next/link'
import React from 'react'
import { AddToCart } from '../Cart/AddToCart'
import { Plus } from 'lucide-react'
import { Badge } from '../ui/badge'

type Props = {
  product: Partial<Product>
}

export const ProductGridItem: React.FC<Props> = ({ product }) => {
  const { gallery, priceInUSD, title, settings } = product

  let price = priceInUSD

  const variants = product.variants?.docs

  if (variants && variants.length > 0) {
    const variant = variants[0]
    if (
      variant &&
      typeof variant === 'object' &&
      variant?.priceInUSD &&
      typeof variant.priceInUSD === 'number'
    ) {
      price = variant.priceInUSD
    }
  }

  const image =
    gallery?.[0]?.image && typeof gallery[0]?.image !== 'string' ? gallery[0]?.image : false

  return (
    <Link
      className="relative inline-block h-full w-full group"
      href={`/shop/products/${product.slug}`}
    >
      <div className="relative">
        {image ? (
          <Media
            className={clsx(
              'relative aspect-square object-cover border rounded-2xl p-8 bg-background',
            )}
            height={80}
            imgClassName={clsx('h-full w-full object-cover rounded-2xl', {
              'transition duration-300 ease-in-out group-hover:scale-102': true,
            })}
            resource={image}
            width={80}
          />
        ) : null}
        <AddToCart
          product={product as Product}
          size={'icon-lg'}
          className={'absolute bottom-1 right-1 z-50 rounded-full'}
        >
          <Plus />
        </AddToCart>

        {settings?.discount && (
          <Badge variant={'destructive'} className="absolute top-2 right-2">
            -{settings.discount}%
          </Badge>
        )}
      </div>

      <div className="font-medium text-muted-foreground group-hover:text-primary flex justify-between items-center mt-4">
        <div>{title}</div>

        {typeof price === 'number' && (
          <div className="font-mono">
            <Price amount={price} discount={settings?.discount!} />
          </div>
        )}
      </div>
    </Link>
  )
}
