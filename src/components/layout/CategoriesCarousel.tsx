'use client'

import { cn } from '@/lib/utils'
import { Category } from '@/payload-types'
import { DynamicIcon } from 'lucide-react/dynamic'
import { ComponentProps } from 'react'
import { Button } from '../ui/button'
import { Carousel, CarouselContent, CarouselItem } from '../ui/carousel'
import { SearchParams } from '@/app/(frontend)/shop/page'
import { getPayload } from 'payload'
import config from '@payload-config'
import { CategoryItem } from './search/Categories.client'
import { useCategories } from '@/contexts/CategoryContext'
// import { CategoryItem } from './search/Categories.client'

export default function CategoriesCarousel({ ...props }: ComponentProps<'div'>) {
  const { childCategories: categories, activeCategory } = useCategories()

  if (!categories) return

  return (
    <div {...props} className={cn('wscreen w-full', props.className)}>
      <Carousel>
        <CarouselContent>
          {categories.map((c) => (
            <CarouselItem key={c.id} className="basis-auto">
              <CategoryItem category={c}>
                <Button variant={activeCategory?.id === c.id ? 'default' : 'secondary'}>
                  <DynamicIcon name={c.icon!} />
                  {c.title}
                </Button>
              </CategoryItem>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  )
}
