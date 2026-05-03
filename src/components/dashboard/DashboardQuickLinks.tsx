'use client'

import ArrowOutwardRoundedIcon from '@mui/icons-material/ArrowOutwardRounded'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardActionArea from '@mui/material/CardActionArea'
import CardContent from '@mui/material/CardContent'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Link from 'next/link'

import { useDashboardRoutes } from '@/hooks/useDashboardRoutes'

type QuickAccessItem = {
  label: string
  href: string
  description?: string
  color?: string
  buttonLabel: string
  IconComponent?: React.ElementType
}

export function DashboardQuickLinks() {
  const routes = useDashboardRoutes()

  const quickAccessItems: QuickAccessItem[] = routes.map((route) => ({
    label: route.label,
    href: route.href,
    description: route.description,
    color: route.color,
    buttonLabel: route.buttonLabel ?? 'Cadastrar',
    IconComponent: route.IconComponent,
  }))

  return (
    <Box
      sx={{
        display: 'grid',
        gap: 2,
        gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' },
      }}
    >
      {quickAccessItems.map((item) => {
        const Icon = item.IconComponent

        return (
          <Card key={item.href} sx={{ borderRadius: 3, height: '100%' }}>
            <CardActionArea
              component={Link}
              href={item.href}
              sx={{ height: '100%', alignItems: 'stretch' }}
            >
              <CardContent sx={{ p: 2.5 }}>
                <Stack spacing={2}>
                  <Stack direction="row" spacing={1.25} alignItems="center">
                    {Icon ? <Icon sx={{ color: item.color ?? 'primary.main' }} /> : null}
                    <Box sx={{ minWidth: 0 }}>
                      <Typography fontWeight={700}>{item.label}</Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                          minHeight: '2.5em',
                        }}
                      >
                        {item.description}
                      </Typography>
                    </Box>
                  </Stack>

                  <Button
                    component="span"
                    size="small"
                    variant="contained"
                    endIcon={<ArrowOutwardRoundedIcon />}
                    tabIndex={-1}
                    sx={{
                      pointerEvents: 'none',
                      alignSelf: 'flex-start',
                      ml: 'calc(1.5rem + 10px)',
                      bgcolor: item.color,
                      color: '#fff',
                      '&:hover': { bgcolor: item.color },
                    }}
                  >
                    {item.buttonLabel}
                  </Button>
                </Stack>
              </CardContent>
            </CardActionArea>
          </Card>
        )
      })}
    </Box>
  )
}
