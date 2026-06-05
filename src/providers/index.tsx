import { AuthProvider } from '@/providers/Auth'
import { EcommerceProvider } from '@payloadcms/plugin-ecommerce/client/react'
import { stripeAdapterClient } from '@payloadcms/plugin-ecommerce/payments/stripe'
import React from 'react'
import { SonnerProvider } from '@/providers/Sonner'
import { ThemeProvider } from 'next-themes'
import BProgress from './BProgress'

export const Providers: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <AuthProvider>
        <SonnerProvider />
        <EcommerceProvider
          enableVariants={true}
          api={{
            cartsFetchQuery: {
              depth: 2,
              populate: {
                products: {
                  slug: true,
                  title: true,
                  gallery: true,
                  inventory: true,
                  settings: true,
                },
                variants: {
                  title: true,
                  inventory: true,
                },
              },
            },
          }}
          paymentMethods={[
            stripeAdapterClient({
              publishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '',
            }),
          ]}
        >
          <BProgress>{children}</BProgress>
        </EcommerceProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}
