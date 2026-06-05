import { sorting } from '@/lib/constants'
import config from '@payload-config'
import { DynamicIcon } from 'lucide-react/dynamic'
import { getPayload } from 'payload'
import { ComponentProps, Suspense } from 'react'
import { Button } from '../ui/button'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
} from '../ui/sidebar'
import { Skeleton } from '../ui/skeleton'
import { CategoryItem } from './search/Categories.client'
import { FilterList } from './search/filter'
import { Boxes, SortAsc } from 'lucide-react'
import { SortFilterItem } from './search/filter/FilterItem'
import Logo from './Logo'
import CategoryNavItem from './CategoryNavItem'

export default function ShopSidebar({ ...props }: ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props} variant="floating">
      <SidebarHeader>
        <ShopSidebar.Header />
      </SidebarHeader>

      <SidebarContent>
        <ShopSidebar.CategoriesMenu />
        <ShopSidebar.SortMenu />
      </SidebarContent>

      <SidebarFooter></SidebarFooter>
    </Sidebar>
  )
}

ShopSidebar.CategoriesMenu = async () => {
  const payload = await getPayload({ config: config })

  const { docs: categories } = await payload.find({
    collection: 'categories',
    where: {
      refCategory: { equals: undefined },
    },
    sort: 'title',
  })

  return (
    <SidebarGroup>
      <SidebarGroupLabel>
        <Boxes />
        Categories
      </SidebarGroupLabel>

      <Suspense
        fallback={[...Array(4)].map((_, i) => (
          <Skeleton key={i} className="w-full h-10 rounded-md mb-2" />
        ))}
      >
        <SidebarGroupContent>
          <SidebarMenu className="space-y-1">
            {categories.length > 0 &&
              categories.map((c) => (
                <SidebarMenuButton
                  tooltip={c.title}
                  key={c.id}
                  render={<CategoryNavItem category={c} />}
                />
              ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </Suspense>
    </SidebarGroup>
  )
}

ShopSidebar.SortMenu = () => {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>
        <SortAsc />
        Sort
      </SidebarGroupLabel>

      <SidebarGroupContent>
        <SidebarMenu>
          {sorting.map((s, i) => (
            // <SidebarMenuButton variant="outline" key={i} tooltip={s.title}>
            <SidebarMenuButton key={i} tooltip={s.title}>
              <SortFilterItem item={s} />
            </SidebarMenuButton>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}

ShopSidebar.Header = () => {
  return (
    <SidebarMenuButton>
      <Logo className="size-10" />
    </SidebarMenuButton>
  )
}
