import { LoginForm } from '@/components/auth/LoginForm';
import Box from '@mui/material/Box';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Login',
};

export default function HomePage() {
  return (
    <Box
      component="main"
      sx={{
        minHeight: '100vh',
        display: 'grid',
        placeItems: 'center',
        px: 2,
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: '#0A1220',
        backgroundImage:
          'radial-gradient(circle at 18% 22%, rgba(14, 165, 233, 0.2), transparent 34%), radial-gradient(circle at 82% 14%, rgba(30, 64, 175, 0.25), transparent 30%), linear-gradient(140deg, #04070E 0%, #0B1628 48%, #0E1F35 100%)',
        '&::before': {
          content: '""',
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'linear-gradient(rgba(148, 163, 184, 0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(148, 163, 184, 0.08) 1px, transparent 1px)',
          backgroundSize: { xs: '28px 28px', md: '34px 34px' },
          maskImage: 'linear-gradient(180deg, rgba(0,0,0,0.45), rgba(0,0,0,0.95))',
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(180deg, rgba(2, 6, 23, 0.2) 0%, rgba(2, 6, 23, 0.75) 100%)',
        },
        '> *': {
          position: 'relative',
          zIndex: 1,
        },
      }}
    >
      <LoginForm />
    </Box>
  );
}
