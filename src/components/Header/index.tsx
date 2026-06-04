import { getCachedGlobal } from '@/utilities/getGlobals'

import './index.css'
import { HeaderClient } from './index.client'
import { AppNavbar } from '../layout/AppNavbar'

export async function Header() {
  const header = await getCachedGlobal('header', 1)()

  // return <HeaderClient header={header} />
  return <AppNavbar header={header} />
}
