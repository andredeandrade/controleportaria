'use client'

import ArrowOutwardRoundedIcon from '@mui/icons-material/ArrowOutwardRounded'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardActionArea from '@mui/material/CardActionArea'
import CardContent from '@mui/material/CardContent'
import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Link from 'next/link'
import { useMemo } from 'react'

import { useSidebarRoutes } from '@/hooks/useSidebarRoutes'

type QuickAccessItem = {
  label: string
  href: string
  parentLabel?: string
  IconComponent?: React.ElementType
}

export function DashboardQuickLinks() {
  const routes = useSidebarRoutes()

  const quickAccessItems = useMemo<QuickAccessItem[]>(() => {
    return routes.flatMap((route) => {
      const mainRoute = route.href
        ? [
            {
              label: route.label,
              href: route.href,
              IconComponent: route.IconComponent,
            },
          ]
        : []

      const childRoutes =
        route.children?.map((child) => ({
          label: child.label,
          href: child.href,
          parentLabel: route.label,
          IconComponent: route.IconComponent,
        })) ?? []

      return [...mainRoute, ...childRoutes]
    })
  }, [routes])

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
                    {Icon ? <Icon color="primary" /> : null}
                    <Box sx={{ minWidth: 0 }}>
                      <Typography fontWeight={700}>{item.label}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        Acesse rapidamente este módulo.
                      </Typography>
                    </Box>
                  </Stack>

                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    {item.parentLabel ? (
                      <Chip label={item.parentLabel} size="small" variant="outlined" />
                    ) : (
                      <Box />
                    )}

                    <ArrowOutwardRoundedIcon color="action" fontSize="small" />
                  </Stack>
                </Stack>
              </CardContent>
            </CardActionArea>
          </Card>
        )
      })}
    </Box>
  )
}
