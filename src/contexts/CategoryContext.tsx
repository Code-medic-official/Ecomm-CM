'use client'

import { Category } from '@/payload-types'
import {
  ComponentProps,
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useEffectEvent,
  useState,
} from 'react'

interface Props {
  categories: Category[]
  parentCategory?: Category
  activeCategory?: Category
  childCategories?: Category[]

  setChildCategories: Dispatch<SetStateAction<Category[]>>
  setCategories: Dispatch<SetStateAction<Category[]>>
  setActiveCategory: Dispatch<SetStateAction<Category | undefined>>
  setParentCategory: Dispatch<SetStateAction<Category | undefined>>
}

const CategoryContext = createContext<null | Props>(null)

export const useCategories = () => {
  const context = useContext(CategoryContext)

  if (!context) throw new Error("Component should be child of '<CategoryProvider />'")

  return context
}

export const CategoryProvider = ({
  categoriesInit = [],
  ...props
}: { categoriesInit: Category[] } & ComponentProps<'div'>) => {
  const [categories, setCategories] = useState<Category[]>(categoriesInit)
  const [childCategories, setChildCategories] = useState<Category[]>([])
  const [parentCategory, setParentCategory] = useState<Category>()
  const [activeCategory, setActiveCategory] = useState<Category>()

  const Values: Props = {
    categories,
    parentCategory,
    activeCategory,
    childCategories,
    setCategories,
    setChildCategories,
    setParentCategory,
    setActiveCategory,
  }

  const getChildCategories = useEffectEvent(() =>
    setChildCategories(categories.filter((c) => c.refCategory?.id === parentCategory!.id)),
  )

  useEffect(() => {
    parentCategory && getChildCategories()
  }, [parentCategory])

  return (
    <CategoryContext.Provider value={Values}>
      <div {...props} />
    </CategoryContext.Provider>
  )
}
