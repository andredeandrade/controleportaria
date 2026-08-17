import { LoginForm } from '@/components/auth/LoginForm'
import Box from '@mui/material/Box'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Login',
}

export default function HomePage() {
  return (
    <Box
      component="main"
      sx={{
        minHeight: '100vh',
        display: 'grid',
        placeItems: 'center',
        px: 2,
        bgcolor: 'background.default',
      }}
    >
      <LoginForm />
    </Box>
  )
}
