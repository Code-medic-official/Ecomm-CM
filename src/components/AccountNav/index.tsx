'use client'

import { Button } from '@/components/ui/button'
import clsx from 'clsx'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

type Props = {
  className?: string
}

export const AccountNav: React.FC<Props> = ({ className }) => {
  const pathname = usePathname()

  return (
    <div className={clsx(className)}>
      <ul className="flex flex-col gap-2">
        <li>
          <Button
            render={
              <Link
                href="/account"
                className={clsx('text-primary/50 hover:text-primary hover:no-underline', {
                  'text-primary': pathname === '/account',
                })}
              >
                Account settings
              </Link>
            }
            variant="link"
          />
        </li>

        <li>
          <Button
            render={
              <Link
                href="/account/addresses"
                className={clsx('text-primary/50 hover:text-primary hover:no-underline', {
                  'text-primary': pathname === '/account/addresses',
                })}
              >
                Addresses
              </Link>
            }
            variant="link"
          />
        </li>

        <li>
          <Button
            render={<Link href="/orders">Orders</Link>}
            variant="link"
            className={clsx('text-primary/50 hover:text-primary hover:no-underline', {
              'text-primary': pathname === '/orders' || pathname.includes('/orders'),
            })}
          />
        </li>
      </ul>

      <hr className="w-full border-white/5" />

      <Button
        render={<Link href="/logout">Log out</Link>}
        variant="link"
        className={clsx('text-primary/50 hover:text-primary hover:no-underline', {
          'text-primary': pathname === '/logout',
        })}
      />
    </div>
  )
}
