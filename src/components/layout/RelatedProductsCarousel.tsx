'use client'

import { cn } from '@/lib/utils'
import { Media, Product } from '@/payload-types'
import Link from 'next/link'
import { ComponentProps } from 'react'
import { GridTileImage } from '../Grid/tile'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '../ui/carousel'
// import { CategoryItem } from './search/Categories.client'

export default function RelatedProductsCarousel({
  products,
  ...props
}: { products: Product[] } & ComponentProps<'div'>) {
  const _products = [
    ...products,
    ...products,
    ...products,
    ...products,
    ...products,
    ...products,
    ...products,
    ...products,
    ...products,
    ...products,
    ...products,
    ...products,
    ...products,
    ...products,
    ...products,
    ...products,
  ]

  if (!products) return

  return (
    <div {...props} className={cn('wscreen w-full', props.className)}>
      <Carousel>
        <CarouselContent>
          {/* <CarouselPrevious /> */}

          {_products.map((product) => (
            <CarouselItem
              key={product.id}
              className="basis-auto aspect-square w-full flex-none min-[475px]:w-1/2 md:w-1/3 xl:w-1/4 2xl:w-1/5"
            >
              <Link className="relative h-full w-full" href={`/shop/products/${product.slug}`}>
                <GridTileImage
                  label={{
                    amount: product.priceInUSD!,
                    title: product.title,
                    discount: product.settings?.discount!,
                  }}
                  media={product.meta?.image as Media}
                />
              </Link>
            </CarouselItem>
          ))}

          {/* <CarouselNext /> */}
        </CarouselContent>
      </Carousel>
    </div>
  )
}
