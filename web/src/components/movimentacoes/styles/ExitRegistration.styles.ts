'use client'

import Button from '@mui/material/Button'
import DialogActions from '@mui/material/DialogActions'
import { styled } from '@mui/material/styles'

export const RegisterExitButton = styled(Button)({
  minWidth: 148,
  backgroundColor: '#B91C1C',
  color: '#FFFFFF',
  fontWeight: 700,
  boxShadow: 'none',
  '&:hover': {
    backgroundColor: '#991B1B',
    boxShadow: 'none',
  },
})

export const MobileRegisterExitButton = styled(RegisterExitButton)({
  minWidth: 128,
  alignSelf: 'flex-start',
})

export const ExitDialogActions = styled(DialogActions)({
  paddingLeft: 24,
  paddingRight: 24,
  paddingBottom: 20,
})

export const ConfirmExitButton = styled(Button)({
  backgroundColor: '#B91C1C',
  '&:hover': {
    backgroundColor: '#991B1B',
  },
})
