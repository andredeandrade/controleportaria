import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#334155',
      dark: '#1F2937',
    },
    secondary: {
      main: '#475569',
    },
    background: {
      default: '#0F172A',
      paper: '#111827',
    },
    text: {
      primary: '#F8FAFC',
      secondary: '#CBD5E1',
    },
    divider: 'rgba(148, 163, 184, 0.18)',
    success: {
      main: '#166534',
    },
    warning: {
      main: '#B45309',
    },
    error: {
      main: '#991B1B',
    },
    info: {
      main: '#1D4ED8',
    },
  },
  shape: {
    borderRadius: 10,
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
})

export default theme
