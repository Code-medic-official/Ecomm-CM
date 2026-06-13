'use client'

import { cn } from '@/lib/utils'
import { Category, Media, Product } from '@/payload-types'
import { DynamicIcon } from 'lucide-react/dynamic'
import Image from 'next/image'
import { ComponentProps } from 'react'
import Heading from '../custom/Heading'
import { RichText } from '../RichText'
import { Badge } from '../ui/badge'
import { Card, CardContent } from '../ui/card'
import { Carousel, CarouselContent, CarouselItem } from '../ui/carousel'
// import { RichText } from '@payloadcms/richtext-lexical/react'
// import { CategoryItem } from './search/Categories.client'

export default function FeaturedCarousel({
  products,
  ...props
}: { products: Product[] } & ComponentProps<'div'>) {
  return (
    <div {...props} className={cn('w-full', props.className)}>
      <Carousel>
        <CarouselContent>
          {products.map((p) => (
            <CarouselItem key={p.id} className="basis-auto">
              <FeaturedCarousel.Card product={p} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  )
}

FeaturedCarousel.Card = ({
  product,
  ...props
}: { product: Product } & ComponentProps<typeof Card>) => {
  const { title, description, gallery, featured, categories } = product

  console.log(product)

  const img = gallery[0]?.image as Media
  const category = categories[0] as Category

  return (
    <Card className={cn('relative w-[95vw] h-[30vh] mx-auto', props.className)}>
      <CardContent>
        <Heading className={'text-xl font-medium'}>{title}</Heading>
        <div className="w-1/3">
          <RichText
            className=" text-muted-foreground text-sm"
            data={description!}
            // enableGutter={false}
          />
        </div>

        <Badge className="absolute top-1 right-1">
          <DynamicIcon name={category.icon!} />
          {category.title}
        </Badge>

        <Image
          src={img.url!}
          alt="Product-image"
          width={999}
          height={999}
          className="object-cover absolute top-0 right-0 size-[30vh]"
        />
      </CardContent>
    </Card>
  )
}
