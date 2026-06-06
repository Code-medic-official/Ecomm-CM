'use client'
import { cn } from '@/lib/utils'
import { getDiscountPrice } from '@/lib/utils/product.utils'
import { useCurrency } from '@payloadcms/plugin-ecommerce/client/react'
import React, { useMemo } from 'react'

type BaseProps = {
  className?: string
  currencyCodeClassName?: string
  as?: 'span' | 'p'
}

type PriceFixed = {
  amount: number
  currencyCode?: string
  highestAmount?: never
  lowestAmount?: never
}

type PriceRange = {
  amount?: never
  currencyCode?: string
  highestAmount: number
  lowestAmount: number
}

type Props = BaseProps & (PriceFixed | PriceRange) & { discount?: number }

export const Price = ({
  amount,
  className,
  highestAmount,
  lowestAmount,
  currencyCode: currencyCodeFromProps,
  discount,
  as = 'p',
}: Props & React.ComponentProps<'p'>) => {
  const { formatCurrency, supportedCurrencies } = useCurrency()

  const Element = as

  const currencyToUse = useMemo(() => {
    if (currencyCodeFromProps) {
      return supportedCurrencies.find((currency) => currency.code === currencyCodeFromProps)
    }
    return undefined
  }, [currencyCodeFromProps, supportedCurrencies])

  if (typeof amount === 'number') {
    return (
      <>
        {discount ? (
          <>
            <Element className={cn('font-mono leading-tight', className)} suppressHydrationWarning>
              <span
                className={'block'}
              >{`${formatCurrency(getDiscountPrice(discount, amount), { currency: currencyToUse })}`}</span>
              <span className="line-through text-xs text-muted-foreground -mt-1">{`${formatCurrency(amount, { currency: currencyToUse })}`}</span>
            </Element>
          </>
        ) : (
          <Element className={cn('font-mono', className)} suppressHydrationWarning>
            {formatCurrency(amount, { currency: currencyToUse })}
          </Element>
        )}
      </>
    )
  }

  if (highestAmount && highestAmount !== lowestAmount) {
    console.log('range', discount)
    return (
      <>
        {discount ? (
          <Element className={cn('font-mono', className)} suppressHydrationWarning>
            {`${formatCurrency(getDiscountPrice(discount, lowestAmount), { currency: currencyToUse })} - ${formatCurrency(getDiscountPrice(discount, highestAmount), { currency: currencyToUse })}`}
          </Element>
        ) : (
          <Element className={cn('font-mono', className)} suppressHydrationWarning>
            {`${formatCurrency(lowestAmount, { currency: currencyToUse })} - ${formatCurrency(highestAmount, { currency: currencyToUse })}`}
          </Element>
        )}
      </>
    )
  }

  if (lowestAmount) {
    return (
      <>
        {discount ? (
          <Element className={cn('font-mono', className)} suppressHydrationWarning>
            {`${formatCurrency(getDiscountPrice(discount, lowestAmount), { currency: currencyToUse })}`}
          </Element>
        ) : (
          <Element className={cn('font-mono', className)} suppressHydrationWarning>
            {`${formatCurrency(lowestAmount, { currency: currencyToUse })}`}
          </Element>
        )}
      </>
    )
  }

  if (discount) {
    return (
      <>
        {discount ? (
          <>
            <Element className={cn('font-mono leading-tight', className)} suppressHydrationWarning>
              <span
                className={'block'}
              >{`${formatCurrency(getDiscountPrice(discount, amount), { currency: currencyToUse })}`}</span>
              <span className="line-through text-xs text-muted-foreground -mt-1">{`${formatCurrency(amount, { currency: currencyToUse })}`}</span>
            </Element>
          </>
        ) : (
          <Element className={cn('font-mono', className)} suppressHydrationWarning>
            {formatCurrency(amount, { currency: currencyToUse })}
          </Element>
        )}
      </>
    )
  }

  return null
}
