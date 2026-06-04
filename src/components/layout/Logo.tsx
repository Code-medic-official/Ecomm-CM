import Image from 'next/image'
import { ComponentProps } from 'react'

//! Make Dynamic

export default function Logo(props: ComponentProps<'div'>) {
  return (
    <div {...props}>
      <Image
        src="/assets/logo.png"
        alt="logo"
        height={999}
        width={999}
        className="object-cover size-full rounded-lg"
      />
    </div>
  )
}
