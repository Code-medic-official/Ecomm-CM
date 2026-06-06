import { spaceGroteskFont } from '@/fonts/fonts'
import { cn } from '@/lib/utils'
import { ComponentProps } from 'react'

export default function Heading(props: ComponentProps<'div'>) {
  return (
    <div
      {...props}
      className={cn(
        'font-heading font-medium text-primary text-lg flex items-center gap-x-1',
        props.className,
      )}
    />
  )
}
