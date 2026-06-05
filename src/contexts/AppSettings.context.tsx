'use client'

import { Setting } from '@/payload-types'
import { ComponentProps, createContext, useContext, useState } from 'react'

interface Props {
  settings: Setting
}

const AppSettingsContext = createContext<null | Props>(null)

export const useAppSettings = () => {
  const context = useContext(AppSettingsContext)

  if (!context) throw new Error('Element must be child of <AppSettingsProvider />!')

  return context
}

export const AppSettingsProvider = ({
  settingsInit,
  ...props
}: { settingsInit: Setting } & ComponentProps<'div'>) => {
  const [settings, setSettings] = useState<Setting>(settingsInit)

  const Value: Props = { settings }

  return (
    <AppSettingsContext.Provider value={Value}>
      <div {...props} />
    </AppSettingsContext.Provider>
  )
}
