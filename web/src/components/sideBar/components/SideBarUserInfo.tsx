'use client'

import PersonRoundedIcon from '@mui/icons-material/PersonRounded'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

import { UserRole } from '@/app/api/auth/me/types'
import { useAuthenticatedUser } from '@/hooks/useAuthenticatedUser'

function getRoleLabel(role: UserRole): string {
  if (role === UserRole.ADMIN) {
    return 'Administrador'
  }

  return 'Segurança'
}

export default function SideBarUserInfo() {
  const { data: user, isPending, isError } = useAuthenticatedUser()

  const userName = user?.name || (isPending ? 'Carregando...' : 'Usuário')
  const roleLabel = user ? getRoleLabel(user.role) : isError ? 'Perfil indisponível' : 'Segurança'

  return (
    <Box sx={{ px: '16px', py: '20px' }}>
      <Stack direction="row" spacing="12px" alignItems="center">
        <Avatar
          sx={{
            width: 36,
            height: 36,
            bgcolor: 'rgba(173, 198, 255, 0.14)',
            color: '#adc6ff',
            border: '1px solid rgba(173, 198, 255, 0.24)',
          }}
        >
          <PersonRoundedIcon sx={{ fontSize: 20 }} />
        </Avatar>

        <Box sx={{ minWidth: 0 }}>
          <Typography
            variant="subtitle2"
            noWrap
            sx={{
              color: '#dae2fd',
              letterSpacing: 'normal',
              fontWeight: 600,
              fontSize: '0.875rem',
            }}
          >
            {userName}
          </Typography>
          <Typography
            variant="caption"
            noWrap
            sx={{ color: '#8c909f', fontWeight: 400, lineHeight: 1.4 }}
          >
            {roleLabel}
          </Typography>
        </Box>
      </Stack>
    </Box>
  )
}
