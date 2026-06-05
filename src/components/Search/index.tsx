'use client'

import { cn } from '@/utilities/cn'
import { createUrl } from '@/utilities/createUrl'
import { SearchIcon } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useState } from 'react'
import { Input } from '../ui/input'
import { GooeyInput } from '../ui/gooey-input'
import { useMediaQuery } from '@uidotdev/usehooks'

type Props = {
  className?: string
}

export const Search: React.FC<Props> = ({ className }) => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [q, setQ] = useState<string>()
  const isSmScreen = useMediaQuery('(width <= 640px)')

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    // const val = e.target as HTMLFormElement
    // const search = val.search as HTMLInputElement
    const newParams = new URLSearchParams(searchParams.toString())

    if (q) {
      newParams.set('q', q)
    } else {
      newParams.delete('q')
    }

    router.push(createUrl('/shop', newParams))
  }

  return (
    <form className={cn('relative w-full', className)} onSubmit={onSubmit}>
      <GooeyInput
        className="w-full rounded-lg font-mono md:justify-end"
        defaultValue={searchParams?.get('q') || ''}
        key={searchParams?.get('q')}
        onValueChange={(v) => setQ(v)}
        // name="search"
        placeholder="Search products..."
        expandedWidth={isSmScreen ? 270 : 400}
        collapsedWidth={200}
        // type="text"
      />
    </form>
  )
}
