import { ComponentProps, ReactNode } from 'react'

import { cn } from '@/lib/utils'
import { useMediaQuery } from '@uidotdev/usehooks'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog'
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '../ui/drawer'

export function DynamicPanel({
  children,
  ...props
}: {
  dialogProps?: ComponentProps<typeof Dialog>
  drawerProps?: ComponentProps<typeof Drawer>
  children: ReactNode
}) {
  const isSmScreen = useMediaQuery('(width <= 640px)')

  if (isSmScreen) {
    return <Drawer {...props.drawerProps}>{children}</Drawer>
  } else {
    return <Dialog {...props.dialogProps}>{children}</Dialog>
  }
}

export const DynamicPanelTrigger = ({
  children,
  className,
  ...props
}: {
  children: ReactNode
  className?: string
  dialogProps?: ComponentProps<typeof DialogTrigger>
  drawerProps?: ComponentProps<typeof DrawerTrigger>
}) => {
  const isSmScreen = useMediaQuery('(width <= 640px)')

  if (isSmScreen) {
    return (
      <DrawerTrigger {...props.drawerProps} className={cn('', className)} asChild>
        {children}
      </DrawerTrigger>
    )
  } else {
    return (
      <DialogTrigger
        {...props.dialogProps}
        className={cn('', className)}
        nativeButton={false}
        render={<div>{children}</div>}
      />
    )
  }
}

export const DynamicPanelContent = ({
  className,
  children,
  ...props
}: {
  className?: string
  children?: ReactNode
  dialogProps?: ComponentProps<typeof DialogContent>
  drawerProps?: ComponentProps<typeof DrawerContent>
}) => {
  const isSmScreen = useMediaQuery('(width <= 640px)')

  if (isSmScreen) {
    return (
      <DrawerContent className={cn('min-h-[50vh] p-3', className)} {...props.drawerProps}>
        {children}
      </DrawerContent>
    )
  } else {
    return (
      <DialogContent className={cn('', className)} {...props.dialogProps}>
        {children}
      </DialogContent>
    )
  }
}

export const DynamicPanelHeader = ({
  className,
  children,
  ...props
}: {
  className?: string
  children?: ReactNode
  dialogProps?: ComponentProps<typeof DialogHeader>
  drawerProps?: ComponentProps<typeof DrawerHeader>
}) => {
  const isSmScreen = useMediaQuery('(width <= 640px)')

  if (isSmScreen) {
    return (
      <DrawerHeader className={cn('', className)} {...props.drawerProps}>
        {children}
      </DrawerHeader>
    )
  } else {
    return (
      <DialogHeader className={cn('', className)} {...props.dialogProps}>
        {children}
      </DialogHeader>
    )
  }
}

export const DynamicPanelTitle = ({
  className,
  children,
  ...props
}: {
  className?: string
  children?: ReactNode
  dialogProps?: ComponentProps<typeof DialogTitle>
  drawerProps?: ComponentProps<typeof DrawerTitle>
}) => {
  const isSmScreen = useMediaQuery('(width <= 640px)')

  if (isSmScreen) {
    return (
      <DrawerTitle className={cn('', className)} {...props.drawerProps}>
        {children}
      </DrawerTitle>
    )
  } else {
    return (
      <DialogTitle className={cn('', className)} {...props.dialogProps}>
        {children}
      </DialogTitle>
    )
  }
}

export const DynamicPanelDescription = ({
  className,
  children,
  ...props
}: {
  className?: string
  children?: ReactNode
  dialogProps?: ComponentProps<typeof DialogDescription>
  drawerProps?: ComponentProps<typeof DrawerDescription>
}) => {
  const isSmScreen = useMediaQuery('(width <= 640px)')

  if (isSmScreen) {
    return (
      <DrawerDescription className={cn('', className)} {...props.drawerProps}>
        {children}
      </DrawerDescription>
    )
  } else {
    return (
      <DialogDescription className={cn('', className)} {...props.dialogProps}>
        {children}
      </DialogDescription>
    )
  }
}
