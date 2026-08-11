import { createTheme } from '@mui/material/styles'

const colors = {
  background: '#FFFFFF',

  layout: '#0B1326',
  surface: '#131B2E',

  primary: '#0EA5E9',

  text: '#31394D',
  textSecondary: '#64748B',

  textOnDark: '#FFFFFF',
  textOnDarkSecondary: '#BEC8D2',

  border: '#CBD5E1',

  success: '#22C55E',
  warning: '#F59E0B',
  error: '#EF4444',
  info: '#3B82F6',
} as const

const theme = createTheme({
  palette: {
    mode: 'light',

    primary: {
      main: colors.primary,
    },

    success: {
      main: colors.success,
    },

    warning: {
      main: colors.warning,
    },

    error: {
      main: colors.error,
    },

    info: {
      main: colors.info,
    },

    background: {
      default: colors.background,
      paper: colors.surface,
    },

    text: {
      primary: colors.text,
      secondary: colors.textSecondary,
    },

    divider: colors.border,
  },

  spacing: 4,

  shape: {
    borderRadius: 8,
  },

  typography: {
    fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif',

    h1: {
      fontSize: '2rem',
      fontWeight: 700,
    },

    h2: {
      fontSize: '1.5rem',
      fontWeight: 600,
    },

    h3: {
      fontSize: '1.25rem',
      fontWeight: 600,
    },

    h4: {
      fontSize: '1.125rem',
      fontWeight: 600,
    },

    body1: {
      fontSize: '1rem',
    },

    body2: {
      fontSize: '0.875rem',
    },

    button: {
      fontSize: '0.875rem',
      fontWeight: 600,
      textTransform: 'none',
    },
  },

  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundImage: 'none',
        },
      },
    },

    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },

      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '10px 20px',
        },
      },
    },

    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          backgroundColor: colors.surface,
          borderRadius: 8,

          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderWidth: 2,
            borderColor: colors.primary,
          },
        },

        notchedOutline: {
          borderColor: colors.border,
        },
      },
    },

    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: colors.surface,
          backgroundImage: 'none',
          border: `1px solid ${colors.border}`,
          borderRadius: 16,
        },
      },
    },

    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 9999,
        },
      },
    },
  },
})

export default theme
