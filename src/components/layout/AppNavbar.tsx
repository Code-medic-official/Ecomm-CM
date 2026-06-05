'use client'
import {
  MobileNav,
  MobileNavHeader,
  MobileNavMenu,
  MobileNavToggle,
  Navbar,
  NavbarButton,
  NavbarLogo,
  NavBody,
  NavItems,
} from '@/components/ui/resizable-navbar'
import { Header } from '@/payload-types'
import { ThemeToggle } from '@/providers/Theme'
import Link from 'next/link'
import { Suspense, useState } from 'react'
import { Cart } from '../Cart'
import { OpenCartButton } from '../Cart/OpenCart'
import { SidebarTrigger } from '../ui/sidebar'
import Logo from './Logo'

export function AppNavbar({
  header,
  hideSidebarToggle = false,
}: {
  header: Header
  hideSidebarToggle?: boolean
}) {
  const navItems = header.navItems ?? []

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <div className="relative w-full">
      <Navbar>
        {/* Desktop Navigation */}
        <NavBody>
          {hideSidebarToggle ? (
            <NavbarLogo className="relative z-70" />
          ) : (
            // <Logo className="size-10" />
            <NavbarButton variant="secondary" className="bg-none p-0 text-foreground relatve z-70">
              <SidebarTrigger variant={'secondary'} />
            </NavbarButton>
          )}

          <NavItems items={navItems.map(({ link }) => ({ name: link.label, link: link.url! }))} />
          <div className="flex items-center gap-2">
            <NavbarButton variant="secondary" className="bg-none p-0 text-foreground">
              <ThemeToggle />
            </NavbarButton>

            <Suspense fallback={<OpenCartButton />}>
              <NavbarButton variant="primary" className={'p-0 bg-none '}>
                <Cart />
              </NavbarButton>
            </Suspense>
          </div>
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav>
          <MobileNavHeader>
            {/* <NavbarLogo /> */}
            <div className="flex items-center gap-x-1">
              {hideSidebarToggle ? (
                <NavbarLogo />
              ) : (
                <NavbarButton
                  variant="secondary"
                  className="bg-none p-0 text-foreground relatve z-70"
                >
                  <SidebarTrigger variant={'secondary'} size={'icon-lg'} />
                </NavbarButton>
              )}
              <MobileNavToggle
                isOpen={isMobileMenuOpen}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              />
            </div>

            <div className="flex items-center gap-2">
              <NavbarButton variant="secondary" className="bg-none p-0 text-foreground">
                <ThemeToggle />
              </NavbarButton>

              <Suspense fallback={<OpenCartButton />}>
                <NavbarButton variant="primary" className={'p-0 bg-none '}>
                  <Cart />
                </NavbarButton>
              </Suspense>
            </div>
          </MobileNavHeader>

          <MobileNavMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)}>
            {navItems.map(({ link }, i) => (
              <Link
                key={`mobile-link-${i}`}
                href={link.url!}
                onClick={() => setIsMobileMenuOpen(false)}
                className="relative text-neutral-600 dark:text-neutral-300"
              >
                <span className="block font-heading text-foreground">{link.label}</span>
              </Link>
            ))}
            {/* <div className="flex w-full flex-col gap-4">
              <NavbarButton
                onClick={() => setIsMobileMenuOpen(false)}
                variant="primary"
                className="w-full"
              >
                Login
              </NavbarButton>
            </div> */}
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
    </div>
  )
}
