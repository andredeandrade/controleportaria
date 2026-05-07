'use client'

import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'

export const MobileListCard = styled(Paper)({
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
