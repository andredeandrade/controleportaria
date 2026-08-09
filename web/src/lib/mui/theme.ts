import { createTheme } from '@mui/material/styles'

// Kinetic Operational Interface — design tokens
const tokens = {
  // Backgrounds
  background: '#0b1326',
  surfaceContainerLowest: '#060e20',
  surfaceContainerLow: '#131b2e',
  surfaceContainer: '#171f33',
  surfaceContainerHigh: '#222a3d',
  surfaceContainerHighest: '#2d3449',
  surfaceBright: '#31394d',

  // Content
  onSurface: '#dae2fd',
  onSurfaceVariant: '#c2c6d6',

  // Borders
  outline: '#8c909f',
  outlineVariant: '#424754',

  // Primary (blue)
  primary: '#adc6ff',
  onPrimary: '#002e6a',
  primaryContainer: '#4d8eff',
  onPrimaryContainer: '#00285d',

  // Secondary (green — semantic: success / online)
  secondary: '#4edea3',
  onSecondary: '#003824',
  secondaryContainer: '#00a572',

  // Tertiary (amber — semantic: warning / pending)
  tertiary: '#ffb95f',
  onTertiary: '#472a00',
  tertiaryContainer: '#ca8100',

  // Error
  error: '#ffb4ab',
  onError: '#690005',
  errorContainer: '#93000a',
  onErrorContainer: '#ffdad6',
} as const

const interStack = 'var(--font-inter), Inter, system-ui, sans-serif'

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: tokens.primary,
      dark: tokens.primaryContainer,
      contrastText: tokens.onPrimary,
    },
    secondary: {
      main: tokens.secondary,
      dark: tokens.secondaryContainer,
      contrastText: tokens.onSecondary,
    },
    error: {
      main: tokens.error,
      dark: tokens.errorContainer,
      contrastText: tokens.onError,
    },
    warning: {
      main: tokens.tertiary,
      dark: tokens.tertiaryContainer,
      contrastText: tokens.onTertiary,
    },
    success: {
      main: tokens.secondary,
      dark: tokens.secondaryContainer,
      contrastText: tokens.onSecondary,
    },
    info: {
      main: tokens.primaryContainer,
      contrastText: tokens.onPrimaryContainer,
    },
    background: {
      default: tokens.background,
      paper: tokens.surfaceContainer,
    },
    text: {
      primary: tokens.onSurface,
      secondary: tokens.onSurfaceVariant,
      disabled: tokens.outline,
    },
    divider: tokens.outlineVariant,
    action: {
      hover: 'rgba(173, 198, 255, 0.08)',
      selected: 'rgba(173, 198, 255, 0.12)',
      focus: 'rgba(173, 198, 255, 0.12)',
      disabledBackground: 'rgba(218, 226, 253, 0.12)',
    },
  },

  // 4px base grid
  spacing: 4,

  shape: {
    borderRadius: 8, // DEFAULT: 0.5rem
  },

  typography: {
    fontFamily: interStack,

    h1: { fontSize: '2rem', fontWeight: 700, lineHeight: 1.25, letterSpacing: '-0.02em' },
    h2: { fontSize: '1.5rem', fontWeight: 600, lineHeight: 1.33, letterSpacing: '-0.01em' },
    h3: { fontSize: '1.25rem', fontWeight: 600, lineHeight: 1.4 },
    h4: { fontSize: '1.125rem', fontWeight: 600, lineHeight: 1.44 },
    h5: { fontSize: '1rem', fontWeight: 600, lineHeight: 1.5 },
    h6: { fontSize: '0.875rem', fontWeight: 600, lineHeight: 1.43 },

    // body-lg
    subtitle1: { fontSize: '1.125rem', fontWeight: 400, lineHeight: 1.55 },
    // label-lg
    subtitle2: { fontSize: '0.875rem', fontWeight: 600, lineHeight: 1.43, letterSpacing: '0.05em' },

    // body-md (default)
    body1: { fontSize: '1rem', fontWeight: 400, lineHeight: 1.5 },
    // body-sm
    body2: { fontSize: '0.875rem', fontWeight: 400, lineHeight: 1.43 },

    // label-md
    caption: { fontSize: '0.75rem', fontWeight: 500, lineHeight: 1.33 },
    // label-sm
    overline: {
      fontSize: '0.6875rem',
      fontWeight: 500,
      lineHeight: 1.27,
      letterSpacing: '0.05em',
      textTransform: 'none',
    },

    button: {
      fontSize: '0.875rem',
      fontWeight: 600,
      lineHeight: 1.43,
      letterSpacing: '0.05em',
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
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: { borderRadius: 8, padding: '10px 20px' },
        outlined: {
          borderColor: tokens.outlineVariant,
          '&:hover': { borderColor: tokens.outline },
        },
      },
    },

    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          backgroundColor: tokens.surfaceContainerLow,
          borderRadius: 8,
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderWidth: 2,
            borderColor: tokens.primary,
          },
        },
        notchedOutline: { borderColor: tokens.outlineVariant },
      },
    },

    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: tokens.surfaceContainer,
          backgroundImage: 'none',
          border: `1px solid ${tokens.outlineVariant}`,
          borderRadius: 16, // large cards: 1rem
        },
      },
    },

    MuiPaper: {
      styleOverrides: {
        root: { backgroundImage: 'none' },
      },
    },

    MuiTableRow: {
      styleOverrides: {
        // 40px density para tabelas operacionais
        root: { height: 40 },
        head: { height: 40 },
      },
    },

    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottomColor: tokens.outlineVariant,
          padding: '0 16px',
        },
        head: {
          color: tokens.onSurfaceVariant,
          fontWeight: 600,
          fontSize: '0.75rem',
          letterSpacing: '0.05em',
        },
      },
    },

    MuiChip: {
      styleOverrides: {
        // status chips: pill-shaped
        root: { borderRadius: 9999 },
      },
    },

    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: tokens.surfaceBright,
          color: tokens.onSurface,
          border: `1px solid ${tokens.outlineVariant}`,
          boxShadow: '0 4px 16px rgba(0,0,0,0.4)',
          borderRadius: 8,
        },
      },
    },

    MuiDialog: {
      styleOverrides: {
        paper: {
          backgroundColor: tokens.surfaceContainerHigh,
          border: `1px solid ${tokens.outlineVariant}`,
          borderRadius: 16,
          boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
        },
      },
    },

    MuiDivider: {
      styleOverrides: {
        root: { borderColor: tokens.outlineVariant },
      },
    },
  },
})

export default theme
