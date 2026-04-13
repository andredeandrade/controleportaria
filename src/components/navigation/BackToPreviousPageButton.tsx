'use client'

import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded'
import IconButton from '@mui/material/IconButton'
import { useRouter } from 'next/navigation'
import type { ReactNode } from 'react'
import type { IconButtonProps } from '@mui/material/IconButton'
import type { SxProps, Theme } from '@mui/material/styles'

type BackToPreviousPageButtonProps = {
  ariaLabel: string
  children?: ReactNode
  fallbackHref?: string
  iconButtonProps?: Omit<IconButtonProps, 'onClick' | 'aria-label' | 'children'>
}

export function BackToPreviousPageButton({
  children,
  ariaLabel,
  fallbackHref = '/dashboard',
  iconButtonProps,
}: BackToPreviousPageButtonProps) {
  const router = useRouter()
  const {
    sx: iconButtonSx,
    disableRipple,
    ...restIconButtonProps
  } = iconButtonProps ?? {}
  const defaultSx: SxProps<Theme> = {
    p: 0,
    color: 'inherit',
    '&:hover': {
      backgroundColor: 'transparent',
    },
  }

  const handleBack = () => {
    if (window.history.length > 1) {
      router.back()
      return
    }

    router.push(fallbackHref)
  }

  return (
    <IconButton
      onClick={handleBack}
      aria-label={ariaLabel}
      size="small"
      disableRipple={disableRipple ?? true}
      sx={iconButtonSx ?? defaultSx}
      {...restIconButtonProps}
    >
      {children ?? <ArrowBackRoundedIcon fontSize="small" />}
    </IconButton>
  )
}