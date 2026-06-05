'use client'

import { useCategories } from '@/contexts/CategoryContext'
import { Category } from '@/payload-types'
import { DynamicIcon } from 'lucide-react/dynamic'
import { Button } from '../ui/button'
import { CategoryItem } from './search/Categories.client'
export default function CategoryNavItem({ category }: { category: Category }) {
  const { parentCategory } = useCategories()
  const isActive = parentCategory?.id === category.id

  return (
    <CategoryItem category={category}>
      <Button variant={isActive ? 'default' : 'outline'} className={'justify-start w-full'}>
        <DynamicIcon name={category.icon!} />
        {category.title}
      </Button>
    </CategoryItem>
  )
}
