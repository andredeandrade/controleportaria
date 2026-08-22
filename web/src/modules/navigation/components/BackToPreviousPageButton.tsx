'use client'

import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded'
import IconButton from '@mui/material/IconButton'
import { styled } from '@mui/material/styles'
import { useRouter } from 'next/navigation'
import type { ReactNode } from 'react'
import type { IconButtonProps } from '@mui/material/IconButton'

type BackToPreviousPageButtonProps = {
  ariaLabel: string
  children?: ReactNode
  fallbackHref?: string
  iconButtonProps?: Omit<IconButtonProps, 'onClick' | 'aria-label' | 'children'>
}

const StyledBackButton = styled(IconButton)({
  padding: 0,
  color: 'inherit',
  '&:hover': {
    backgroundColor: 'transparent',
  },
})

export function BackToPreviousPageButton({
  children,
  ariaLabel,
  fallbackHref = '/dashboard',
  iconButtonProps,
}: BackToPreviousPageButtonProps) {
  const router = useRouter()
  const { sx: iconButtonSx, disableRipple, ...restIconButtonProps } = iconButtonProps ?? {}

  const handleBack = () => {
    if (window.history.length > 1) {
      router.back()
      return
    }

    router.push(fallbackHref)
  }

  return (
    <StyledBackButton
      onClick={handleBack}
      aria-label={ariaLabel}
      size="small"
      disableRipple={disableRipple ?? true}
      sx={iconButtonSx}
      {...restIconButtonProps}
    >
      {children ?? <ArrowBackRoundedIcon fontSize="small" />}
    </StyledBackButton>
  )
}
