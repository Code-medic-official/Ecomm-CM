'use client'

import { ProgressProvider } from '@bprogress/next/app'
import { ReactNode } from 'react'

export default function BProgress({ children }: { children: ReactNode }) {
  return (
    <ProgressProvider height="2px" color="#372aac" options={{ showSpinner: false }} shallowRouting>
      {children}
    </ProgressProvider>
  )
}
