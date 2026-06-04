'use client'
import React, { ReactNode, useCallback, useMemo } from 'react'

import { Category } from '@/payload-types'
import { usePathname, useSearchParams, useRouter } from 'next/navigation'
import clsx from 'clsx'

type Props = {
  category: Category
  children?: ReactNode
}

export const CategoryItem: React.FC<Props> = ({ category, children }) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const isActive = useMemo(() => {
    return searchParams.get('category') === String(category.id)
  }, [category.id, searchParams])

  const setQuery = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString())

    if (isActive) {
      params.delete('category')
    } else {
      params.set('category', String(category.id))
    }

    const newParams = params.toString()

    router.push(pathname + '?' + newParams)
  }, [category.id, isActive, pathname, router, searchParams])

  if (children)
    return (
      <div
        onClick={() => setQuery()}
        className={clsx('hover:cursor-pointer', {
          '': isActive,
        })}
      >
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
