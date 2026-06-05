'use client'
import { AddressForm } from '@/components/forms/AddressForm'
import { Button } from '@/components/ui/button'
import { Address } from '@/payload-types'
import { DefaultDocumentIDType } from 'payload'
import React, { useState } from 'react'
import {
  DynamicPanel,
  DynamicPanelContent,
  DynamicPanelDescription,
  DynamicPanelHeader,
  DynamicPanelTitle,
  DynamicPanelTrigger,
} from '../custom/DynamicPanel'
import { ScrollArea } from '../ui/scroll-area'

type Props = {
  addressID?: DefaultDocumentIDType
  initialData?: Partial<Omit<Address, 'country'>> & { country?: string }
  buttonText?: string
  modalTitle?: string
  callback?: (address: Partial<Address>) => void
  skipSubmission?: boolean
  disabled?: boolean
}

export const CreateAddressModal: React.FC<Props> = ({
  addressID,
  initialData,
  buttonText = 'Add a new address',
  modalTitle = 'Add a new address',
  callback,
  skipSubmission,
  disabled,
}) => {
  const [open, setOpen] = useState(false)
  const handleOpenChange = (state: boolean) => {
    setOpen(state)
  }

  const closeModal = () => {
    setOpen(false)
  }

  const handleCallback = (data: Partial<Address>) => {
    closeModal()

    if (callback) {
      callback(data)
    }
  }

  return (
    <DynamicPanel
      dialogProps={{ open, onOpenChange: handleOpenChange }}
      drawerProps={{ open, onOpenChange: handleOpenChange }}
    >
      <DynamicPanelTrigger dialogProps={{ disabled }} drawerProps={{ disabled }}>
        <Button variant={'outline'}>
          {/* <PlusCircle /> */}
          {buttonText}
        </Button>
      </DynamicPanelTrigger>

      <DynamicPanelContent className={'w-screen md:max-w-[50vw] max-h-screen! smmax-h-'}>
        <DynamicPanelHeader>
          <DynamicPanelTitle>{modalTitle}</DynamicPanelTitle>
          <DynamicPanelDescription>
            This address will be connected to your account.
          </DynamicPanelDescription>
        </DynamicPanelHeader>

        <ScrollArea className="h-[70vh] md:h-[50vh]">
          <AddressForm
            addressID={addressID}
            initialData={initialData}
            callback={handleCallback}
            skipSubmission={skipSubmission}
            
          />
        </ScrollArea>
      </DynamicPanelContent>
    </DynamicPanel>
  )
}
