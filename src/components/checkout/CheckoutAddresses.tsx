'use client'

import { AddressItem } from '@/components/addresses/AddressItem'
import { CreateAddressModal } from '@/components/addresses/CreateAddressModal'
import { Button } from '@/components/ui/button'
import { Address } from '@/payload-types'
import { useAddresses } from '@payloadcms/plugin-ecommerce/client/react'
import { useState } from 'react'
import {
  DynamicPanel,
  DynamicPanelContent,
  DynamicPanelHeader,
  DynamicPanelTitle,
  DynamicPanelTrigger,
} from '../custom/DynamicPanel'

type Props = {
  selectedAddress?: Address
  setAddress: React.Dispatch<React.SetStateAction<Partial<Address> | undefined>>
  heading?: string
  description?: string
  setSubmit?: React.Dispatch<React.SetStateAction<() => void | Promise<void>>>
}

export const CheckoutAddresses: React.FC<Props> = ({
  setAddress,
  heading = 'Addresses',
  description = 'Please select or add your shipping and billing addresses.',
}) => {
  const { addresses } = useAddresses()

  if (!addresses || addresses.length === 0) {
    return (
      <div>
        <p>No addresses found. Please add an address.</p>

        <CreateAddressModal />
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h3 className="text-xl font-medium mb-2">{heading}</h3>
        <p className="text-muted-foreground">{description}</p>
      </div>
      <AddressesModal setAddress={setAddress} />
    </div>
  )
}

const AddressesModal: React.FC<Props> = ({ setAddress }) => {
  const [open, setOpen] = useState(false)
  const handleOpenChange = (state: boolean) => {
    setOpen(state)
  }

  const closeModal = () => {
    setOpen(false)
  }
  const { addresses } = useAddresses()

  if (!addresses || addresses.length === 0) {
    return <p>No addresses found. Please add an address.</p>
  }

  return (
    // <DynamicPanel open={open} onOpenChange={handleOpenChange}>
    <DynamicPanel
      dialogProps={{ open, onOpenChange: handleOpenChange }}
      drawerProps={{ open, onOpenChange: handleOpenChange }}
    >
      <DynamicPanelTrigger>
        <Button variant={'outline'}>{'Select an address'}</Button>
      </DynamicPanelTrigger>
      <DynamicPanelContent>
        <DynamicPanelHeader>
          <DynamicPanelTitle>{'Select an address'}</DynamicPanelTitle>
        </DynamicPanelHeader>

        <div className="flex flex-col gap-12">
          <ul className="flex flex-col gap-8">
            {addresses.map((address) => (
              <li key={address.id} className="border-b pb-8 last:border-none">
                <AddressItem
                  address={address}
                  beforeActions={
                    <Button
                      onClick={(e) => {
                        e.preventDefault()
                        setAddress(address)
                        closeModal()
                      }}
                    >
                      Select
                    </Button>
                  }
                />
              </li>
            ))}
          </ul>

          <CreateAddressModal />
        </div>
      </DynamicPanelContent>
    </DynamicPanel>
  )
}
