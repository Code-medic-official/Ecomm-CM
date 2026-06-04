import clsx from 'clsx'
import React from 'react'

import { Price } from '@/components/Price'
import { Badge } from '../ui/badge'

type Props = {
  amount: number
  position?: 'bottom' | 'center'
  title: string
}

export const Label: React.FC<Props> = ({ amount, position = 'bottom', title }) => {
  return (
    <div
      className={clsx('absolute bottom-0 left-0 flex w-full px-4 pb-4 @container/label', {
        '': position === 'center',
      })}
    >
      <div className="flex items-end justify-between text-sm grow font-semibold ">
        <h3  className="mr-4 text-sm font-mono line-clamp-2 border py-2 px-3 leading-none tracking-tight rounded-full bg-background text-foreground backdrop-blur-md dark:border-neutral-800 dark:bg-background">
          {title}
        </h3>
        {/* <Badge variant="outline" className="mr-4 text-sm font-mono line-clamp-2 border py-2 leading-none tracking-tight rounded-full bg-background text-foreground backdrop-blur-md dark:border-neutral-800 dark:bg-background">
          {title}
        </Badge> */}

        <Badge className="text-sm py-1">
          <Price
            amount={amount}
            // className="flex-none rounded-full bg-primary py-1 px-2  text-primary-foreground"
            currencyCodeClassName="hidden @[275px]/label:inline"
          />
        </Badge>
      </div>
    </div>
  )
}
