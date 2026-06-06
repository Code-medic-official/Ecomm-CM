import { getSettings } from '@/lib/actions/global.actions'
import { sorting } from '@/lib/constants'
import config from '@payload-config'
import { SortAsc } from 'lucide-react'
import { getPayload } from 'payload'
import { ComponentProps, Suspense } from 'react'
import Heading from '../custom/Heading'
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
import CategoryNavItem from './CategoryNavItem'
import Logo from './Logo'
import { SortFilterItem } from './search/filter/FilterItem'

export default function ShopSidebar({ ...props }: ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props} variant="floating" collapsible="offcanvas">
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
      {/* <SidebarGroupLabel>
        <Boxes />
        Categories
      </SidebarGroupLabel> */}

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

ShopSidebar.Header = async () => {
  const { appName, slogan } = await getSettings()

  return (
    <SidebarMenuButton className="h-15 bg-none rounded-b-none rounded-t-lg border-0 border-b-2!">
      <Logo className="size10" />

      <div>
        <Heading className="text-xl text-primary">{appName}</Heading>
        <p className="text-xs text-muted-foreground font-medium">{slogan}</p>
      </div>
    </SidebarMenuButton>
  )
}
