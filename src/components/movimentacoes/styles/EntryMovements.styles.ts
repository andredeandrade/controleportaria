'use client'

import Button from '@mui/material/Button'
import DialogActions from '@mui/material/DialogActions'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'

export const MobileEntryCard = styled(Paper)({
  padding: 16,
  borderRadius: 12,
  backgroundColor: '#F8FAFC',
  borderColor: 'rgba(203, 213, 225, 0.9)',
  boxShadow: '0 12px 28px rgba(15, 23, 42, 0.1)',
})

export const MobileFieldLabel = styled(Typography)({
  color: '#0F172A',
  fontWeight: 700,
})

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
