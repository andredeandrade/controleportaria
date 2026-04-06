import VisibilityOffOutlined from '@mui/icons-material/VisibilityOffOutlined';
import VisibilityOutlined from '@mui/icons-material/VisibilityOutlined';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import AuthTextField from './components/AuthTextField';

type LoginFormData = {
  email: string;
  password: string;
};

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const handleTogglePassword = () => {
    setShowPassword((previousValue) => !previousValue);
  };

  const onSubmit = async () => {
    // Integraremos com a API de autenticação no próximo passo.
  };

  return (
    <Stack spacing={1} sx={{ width: '100%', maxWidth: 360, px: { xs: 0.5, sm: 1 } }}>
      <Stack spacing={1.25} alignItems="center">
        <Box
          component="img"
          src="/images/login-logo.svg"
          alt="Logo Controle Portaria"
          sx={{
            width: { xs: 180, sm: 200 },
            height: 'auto',
            opacity: 0.92,
            filter: 'drop-shadow(0 10px 24px rgba(2, 6, 23, 0.55))',
          }}
        />

        <Typography variant="h5" component="h1" textAlign="center" fontWeight={500} color="#F8FAFC">
          Controle Portaria
        </Typography>
      </Stack>

      <Stack spacing={2.25} component="form" noValidate onSubmit={handleSubmit(onSubmit)}>
        <AuthTextField
          label="E-mail"
          type="email"
          autoComplete="email"
          fullWidth
          required
          variant="standard"
          error={Boolean(errors.email)}
          helperText={errors.email?.message}
          {...register('email', {
            required: 'Informe seu e-mail.',
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: 'Informe um e-mail valido.',
            },
          })}
        />

        <AuthTextField
          label="Senha"
          type={showPassword ? 'text' : 'password'}
          autoComplete="current-password"
          fullWidth
          required
          variant="standard"
          error={Boolean(errors.password)}
          helperText={errors.password?.message}
          {...register('password', {
            required: 'Informe sua senha.',
            minLength: {
              value: 6,
              message: 'A senha deve ter pelo menos 6 caracteres.',
            },
          })}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  type="button"
                  onClick={handleTogglePassword}
                  edge="end"
                  aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
                  sx={{ color: 'rgba(226, 232, 240, 0.82)' }}
                >
                  {showPassword ? <VisibilityOffOutlined /> : <VisibilityOutlined />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <Button
          type="submit"
          variant="contained"
          size="large"
          fullWidth
          disabled={isSubmitting}
          sx={{
            alignSelf: 'center',
            maxWidth: 230,
            borderRadius: 1,
            py: 1.15,
            fontWeight: 500,
            textTransform: 'none',
            letterSpacing: 0.2,
            color: '#020617',
            backgroundColor: '#F8FAFC',
            boxShadow: 'none',
            '&:hover': {
              backgroundColor: '#E2E8F0',
              boxShadow: 'none',
            },
            '&.Mui-disabled': {
              color: 'rgba(2, 6, 23, 0.4)',
              backgroundColor: 'rgba(248, 250, 252, 0.5)',
            },
          }}
        >
          Entrar
        </Button>
      </Stack>
    </Stack>
  );
}
