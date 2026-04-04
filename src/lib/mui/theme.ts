import { createTheme } from '@mui/material/styles';

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
      default: '#F5F6F8',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#111827',
      secondary: '#6B7280',
    },
    divider: '#E5E7EB',
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
});

export default theme;
