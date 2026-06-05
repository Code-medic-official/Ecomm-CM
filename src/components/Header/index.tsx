import { getCachedGlobal } from '@/utilities/getGlobals'

import { AppNavbar } from '../layout/AppNavbar'
import './index.css'

export async function Header() {
  const header = await getCachedGlobal('header', 1)()

  // return <HeaderClient header={header} />
  return <AppNavbar header={header} />
}
