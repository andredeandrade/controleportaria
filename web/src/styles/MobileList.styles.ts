'use client'

import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'

export const MobileListCard = styled(Paper)({
  padding: 16,
  borderRadius: 12,
  backgroundColor: '#171f33',
  borderColor: '#424754',
  boxShadow: 'none',
})

export const MobileFieldLabel = styled(Typography)({
  color: '#475569',
  fontWeight: 700,
  letterSpacing: '0.04em',
  textTransform: 'uppercase',
})
