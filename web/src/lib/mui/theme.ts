import { createTheme } from '@mui/material/styles'

const colors = {
  // Brand / Primary
  primary50: '#F0F9FF',
  primary100: '#E0F2FE',
  primary200: '#BAE6FD',
  primary300: '#7DD3FC',
  primary400: '#38BDF8',
  primary500: '#0EA5E9',
  primary600: '#0284C7',
  primary700: '#0369A1',
  primary800: '#075985',
  primary900: '#0C4A6E',

  // Neutral
  neutral50: '#F8FAFC',
  neutral100: '#F1F5F9',
  neutral200: '#E2E8F0',
  neutral300: '#CBD5E1',
  neutral400: '#94A3B8',
  neutral500: '#64748B',
  neutral600: '#475569',
  neutral700: '#334155',
  neutral800: '#1E293B',
  neutral900: '#0F172A',

  // Semantic
  success50: '#F0FDF4',
  success500: '#22C55E',
  success600: '#16A34A',
  success700: '#15803D',

  warning50: '#FFFBEB',
  warning500: '#F59E0B',
  warning600: '#D97706',
  warning700: '#B45309',

  error50: '#FEF2F2',
  error500: '#EF4444',
  error600: '#DC2626',
  error700: '#B91C1C',

  info50: '#EFF6FF',
  info500: '#3B82F6',
  info600: '#2563EB',
  info700: '#1D4ED8',

  // Product semantic colors
  background: '#FFFFFF',
  surface: '#FFFFFF',
  surfaceSubtle: '#F8FAFC',
  surfaceMuted: '#F1F5F9',

  layoutDark: '#0B1326',
  surfaceDark: '#131B2E',

  text: '#31394D',
  textSecondary: '#64748B',
  textDisabled: '#94A3B8',

  textOnDark: '#FFFFFF',
  textOnDarkSecondary: '#BEC8D2',

  border: '#CBD5E1',
  borderSubtle: '#E2E8F0',
  borderStrong: '#94A3B8',
} as const

const theme = createTheme({
  palette: {
    mode: 'light',

    primary: {
      main: colors.primary500,
      light: colors.primary400,
      dark: colors.primary700,
      contrastText: colors.textOnDark,
    },

    success: {
      main: colors.success500,
      light: colors.success50,
      dark: colors.success700,
      contrastText: colors.textOnDark,
    },

    warning: {
      main: colors.warning500,
      light: colors.warning50,
      dark: colors.warning700,
      contrastText: colors.text,
    },

    error: {
      main: colors.error500,
      light: colors.error50,
      dark: colors.error700,
      contrastText: colors.textOnDark,
    },

    info: {
      main: colors.info500,
      light: colors.info50,
      dark: colors.info700,
      contrastText: colors.textOnDark,
    },

    background: {
      default: colors.background,
      paper: colors.surface,
    },

    text: {
      primary: colors.text,
      secondary: colors.textSecondary,
      disabled: colors.textDisabled,
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
      lineHeight: 1.25,
      fontWeight: 700,
    },

    h2: {
      fontSize: '1.5rem',
      lineHeight: 1.3,
      fontWeight: 600,
    },

    h3: {
      fontSize: '1.25rem',
      lineHeight: 1.4,
      fontWeight: 600,
    },

    h4: {
      fontSize: '1.125rem',
      lineHeight: 1.4,
      fontWeight: 600,
    },

    body1: {
      fontSize: '1rem',
      lineHeight: 1.5,
      fontWeight: 400,
    },

    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.5,
      fontWeight: 400,
    },

    button: {
      fontSize: '0.875rem',
      lineHeight: 1.4,
      fontWeight: 600,
      textTransform: 'none',
    },

    caption: {
      fontSize: '0.75rem',
      lineHeight: 1.4,
      fontWeight: 400,
    },
  },

  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: colors.background,
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
          textTransform: 'none',
          transition: 'background-color 0.2s ease-in-out',
        },

        sizeSmall: {
          minHeight: 32,
          padding: '6px 12px',
        },

        sizeMedium: {
          minHeight: 40,
          padding: '10px 16px',
        },

        sizeLarge: {
          minHeight: 48,
          padding: '12px 24px',
        },
      },
    },

    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          backgroundColor: colors.surface,
          borderRadius: 8,

          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: colors.borderStrong,
          },

          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderWidth: 2,
            borderColor: colors.primary500,
          },

          '&.Mui-error .MuiOutlinedInput-notchedOutline': {
            borderColor: colors.error500,
          },

          '&.Mui-disabled': {
            backgroundColor: colors.surfaceMuted,
          },
        },

        notchedOutline: {
          borderColor: colors.border,
        },

        input: {
          color: colors.text,

          '&::placeholder': {
            color: colors.textSecondary,
            opacity: 1,
          },

          '&.Mui-disabled': {
            color: colors.textDisabled,
            WebkitTextFillColor: colors.textDisabled,
          },
        },
      },
    },

    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: colors.surface,
          backgroundImage: 'none',
          border: `1px solid ${colors.borderSubtle}`,
          borderRadius: 16,
          boxShadow: 'none',
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
