'use client'

import React, { ReactNode, useCallback, useMemo } from 'react'

import { Category } from '@/payload-types'
import { usePathname, useSearchParams, useRouter } from 'next/navigation'
import clsx from 'clsx'
import { useCategories } from '@/contexts/CategoryContext'
import { cn } from '@/lib/utils'
// import { second } from 'BPro'
import { useProgress } from '@bprogress/next'

type Props = {
  category: Category
  children?: ReactNode
}

export const CategoryItem: React.FC<Props> = ({ category, children }) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const { setActiveCategory, setParentCategory, parentCategory } = useCategories()
  const { start } = useProgress()

  const isActive = useMemo(() => {
    return searchParams.get('category') === String(category.id)
  }, [category.id, searchParams])

  const setQuery = useCallback(() => {
    // start(undefined, undefined)
    start()
    const params = new URLSearchParams(searchParams.toString())

    if (isActive) {
      params.delete('category')
    } else {
      params.set('category', String(category.id))
    }

    const newParams = params.toString()

    if (!category.refCategory) setParentCategory(category)
    setActiveCategory(category)

    if (pathname.endsWith('/shop')) {
      router.push(pathname + '?' + newParams)
    } else {
      router.push('/shop' + '?' + newParams)
    }
  }, [category.id, isActive, pathname, router, searchParams])

  if (children)
    return (
      <div onClick={() => setQuery()} className={cn(isActive && 'text-primary')}>
        {children}
      </div>
    )

  return (
    <button
      onClick={() => setQuery()}
      className={clsx('hover:cursor-pointer', {
        '': isActive,
      })}
    >
      {category.title}
    </button>
  )
}
