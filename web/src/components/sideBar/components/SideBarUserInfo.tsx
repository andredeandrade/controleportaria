'use client'

import PersonOutlineRoundedIcon from '@mui/icons-material/PersonOutlineRounded'
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

  const userName = user?.name || (isPending ? 'Carregando usuário...' : 'Usuário')
  const roleLabel = user ? getRoleLabel(user.role) : isError ? 'Perfil indisponível' : 'Segurança'

  return (
    <Box sx={{ px: 2.5, py: 3 }}>
      <Stack direction="row" spacing={1.5} alignItems="center">
        <Avatar
          sx={{
            bgcolor: 'rgba(148, 163, 184, 0.22)',
            color: '#E2E8F0',
          }}
        >
          <PersonOutlineRoundedIcon />
        </Avatar>

        <Box sx={{ minWidth: 0 }}>
          <Typography fontWeight={700} noWrap>
            {userName}
          </Typography>
          <Typography variant="body2" sx={{ color: 'rgba(226, 232, 240, 0.72)' }} noWrap>
            {roleLabel}
          </Typography>
        </Box>
      </Stack>
    </Box>
  )
}
