'use client'

import Button from '@mui/material/Button'
import DialogActions from '@mui/material/DialogActions'
import { styled } from '@mui/material/styles'

export const AccessRegisterButton = styled(Button)(({ theme }) => ({
  minWidth: 148,
  backgroundColor: theme.palette.error.main,
  color: '#FFFFFF',
  fontWeight: 700,
  boxShadow: 'none',
  '&:hover': {
    backgroundColor: theme.palette.error.dark,
    boxShadow: 'none',
  },
}))

export const MobileRegisterExitButton = styled(AccessRegisterButton)({
  minWidth: 128,
  alignSelf: 'flex-start',
})

export const ExitDialogActions = styled(DialogActions)({
  paddingLeft: 24,
  paddingRight: 24,
  paddingBottom: 20,
})
