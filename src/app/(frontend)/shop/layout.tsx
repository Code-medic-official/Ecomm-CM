import { Categories } from '@/components/layout/search/Categories'
import { FilterList } from '@/components/layout/search/filter'
import { sorting } from '@/lib/constants'
import { Search } from '@/components/Search'
import React, { Suspense } from 'react'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import ShopSidebar from '@/components/layout/ShopSidebar'
import { Header } from '@/components/Header'

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={null}>
      <SidebarProvider>
        <ShopSidebar />
        <SidebarInset className='relative' > 
          <Header />
          <div className="container flex flex-col gap-8 my-5 pb-4 ">
            <Search className="mb-2" />

            <div>{children}</div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </Suspense>
  )
}
