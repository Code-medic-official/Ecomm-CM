'use client'

import { useAppSettings } from '@/contexts/AppSettings.context'
import { cn } from '@/lib/utils'
import { Media } from '@/payload-types'
import Image from 'next/image'
import Link from 'next/link'
import { ComponentProps } from 'react'

export default function Logo(props: ComponentProps<'a'>) {
  const { settings } = useAppSettings()
  const logo = settings.logo as Media

  return (
    // <div >
    <Link href={'/shop'} {...props} className={cn('block size-12', props.className)}>
      <Image
        src={logo.url ?? '/assets/logo.png'}
        alt={logo.alt ?? 'logo'}
        height={999}
        width={999}
        priority
        className="object-cover size-full rounded-lg"
      />
    </Link>
    // </div>
  )
}
