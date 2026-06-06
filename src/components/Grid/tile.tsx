import type { Media as MediaType } from '@/payload-types'

import { Label } from '@/components/Grid/Label'
import { Media } from '@/components/Media'
import clsx from 'clsx'
import React from 'react'
import { Badge } from '../ui/badge'

type Props = {
  active?: boolean
  isInteractive?: boolean
  label?: {
    amount: number
    position?: 'bottom' | 'center'
    title: string
    discount?: number
  }
  media: MediaType
}

export const GridTileImage: React.FC<Props> = ({
  active,
  isInteractive = true,
  label,
  ...props
}) => {
  return (
    <div
      className={clsx(
        'group flex h-full w-full items-center justify-center overflow-hidden rounded-lg border bg-background/50 hover:border-blue-600',
        {
          'border-2 border-primary': active,
          'border-muted': !active,
          relative: label,
        },
      )}
    >
      {label && label.discount && (
        <Badge variant={'destructive'} className="absolute top-2 right-2 z-50">
          -{label.discount}%
        </Badge>
      )}

      {props.media ? (
        <Media
          className={clsx('relative h-full w-full object-cover', {
            'transition duration-300 ease-in-out group-hover:scale-105': isInteractive,
          })}
          height={80}
          imgClassName="h-full w-full object-cover"
          resource={props.media}
          width={80}
        />
      ) : null}
      {label ? (
        <Label
          amount={label.amount}
          discount={label.discount}
          position={label.position}
          title={label.title}
        />
      ) : null}
    </div>
  )
}
