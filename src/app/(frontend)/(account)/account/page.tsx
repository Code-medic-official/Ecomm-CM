import type { Metadata } from 'next'

import { AccountForm } from '@/components/forms/AccountForm'
import { OrderItem } from '@/components/OrderItem'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Order } from '@/payload-types'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import configPromise from '@payload-config'
import { headers as getHeaders } from 'next/headers.js'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { getPayload } from 'payload'
import Heading from '@/components/custom/Heading'

export default async function AccountPage() {
  const headers = await getHeaders()
  const payload = await getPayload({ config: configPromise })
  const { user } = await payload.auth({ headers })

  let orders: Order[] | null = null

  if (!user) {
    redirect(
      `/login?warning=${encodeURIComponent('Please login to access your account settings.')}`,
    )
  }

  try {
    const ordersResult = await payload.find({
      collection: 'orders',
      limit: 5,
      user,
      overrideAccess: false,
      pagination: false,
      where: {
        customer: {
          equals: user?.id,
        },
      },
    })

    orders = ordersResult?.docs || []
  } catch (error) {
    // when deploying this template on Payload Cloud, this page needs to build before the APIs are live
    // so swallow the error here and simply render the page with fallback data where necessary
    // in production you may want to redirect to a 404  page or at least log the error somewhere
    // console.error(error)
  }

  return (
    <>
      <Card>
        <CardContent>
          <Heading className="text-3xl mb-8">Account settings</Heading>
          <AccountForm />
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Heading className="text-3xl mb-8">Recent Orders</Heading>

          <div className="prose dark:prose-invert mb-8">
            <p>
              These are the most recent orders you have placed. Each order is associated with an
              payment. As you place more orders, they will appear in your orders list.
            </p>
          </div>

          {(!orders || !Array.isArray(orders) || orders?.length === 0) && (
            <p className="mb-8 font-mono text-muted-foreground">You have no orders.</p>
          )}

          {orders && orders.length > 0 && (
            <ul className="flex flex-col gap-6 mb-8">
              {orders?.map((order, index) => (
                <li key={order.id}>
                  <OrderItem order={order} />
                </li>
              ))}
            </ul>
          )}

          <Button render={<Link href="/orders">View all orders</Link>} variant="default" />
        </CardContent>
      </Card>
    </>
  )
}

export const metadata: Metadata = {
  description: 'Create an account or log in to your existing account.',
  openGraph: mergeOpenGraph({
    title: 'Account',
    url: '/account',
  }),
  title: 'Account',
}
