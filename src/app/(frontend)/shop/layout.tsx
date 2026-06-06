import { Header } from '@/components/Header'
import ShopSidebar from '@/components/layout/ShopSidebar'
import { Search } from '@/components/Search'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { CategoryProvider } from '@/contexts/CategoryContext'
import { Suspense } from 'react'
import config from '@payload-config'
import { getPayload } from 'payload'
import CategoriesCarousel from '@/components/layout/CategoriesCarousel'

export default async function ShopLayout({ children }: LayoutProps<'/shop'>) {
  const payload = await getPayload({ config: config })

  const { docs: categories } = await payload.find({
    collection: 'categories',
    sort: 'title',
  })
  return (
    <Suspense fallback={null}>
      <CategoryProvider categoriesInit={categories}>
        <SidebarProvider>
          <ShopSidebar />
          <SidebarInset className="relative">
            <Header />
            <div className="container space-y-4 my-5 pb-4 px-1! sm:px-3! ">
              <Search className="mb-2" />
              <CategoriesCarousel className="mb-2" />

              <div>{children}</div>
            </div>
          </SidebarInset>
        </SidebarProvider>
      </CategoryProvider>
    </Suspense>
  )
}
