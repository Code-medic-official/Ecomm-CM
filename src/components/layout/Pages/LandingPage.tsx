import { Header } from '@/components/Header'
import { getProducts } from '@/lib/actions/products.actions'
import React from 'react'
import FeaturedCarousel from '../FeaturedCarounsel'
import { getCategories } from '@/lib/actions/categories.actions'

export default async function LandingPage() {
  const [products, categories] = await Promise.all([getProducts({}), getCategories({})])

  return (
    <div className="">
      <Header hideSidebarToggle />

      <div className="containr">
        <FeaturedCarousel products={products} className='mxauto'  />
      </div>
    </div>
  )
}
