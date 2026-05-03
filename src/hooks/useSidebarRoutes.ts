'use client'

import ApartmentRoundedIcon from '@mui/icons-material/ApartmentRounded'
import AssignmentTurnedInRoundedIcon from '@mui/icons-material/AssignmentTurnedInRounded'
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined'
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded'
import EventRoundedIcon from '@mui/icons-material/EventRounded'
import Groups2RoundedIcon from '@mui/icons-material/Groups2Rounded'
import HistoryRoundedIcon from '@mui/icons-material/HistoryRounded'
import ReportProblemRoundedIcon from '@mui/icons-material/ReportProblemRounded'
import SwapHorizRoundedIcon from '@mui/icons-material/SwapHorizRounded'
import { useMemo } from 'react'
import type { ElementType } from 'react'

export type SidebarChildRoute = {
  label: string
  href: string
}

export type SidebarRoute = {
  label: string
  href?: string
  IconComponent?: ElementType
  children?: SidebarChildRoute[]
}

const sidebarRoutesConfig: SidebarRoute[] = [
  {
    label: 'Dashboard',
    href: '/dashboard',
    IconComponent: DashboardRoundedIcon,
  },
  {
    label: 'Movimentações',
    IconComponent: SwapHorizRoundedIcon,
    children: [
      { label: 'Entrada', href: '/movimentacoes/entrada' },
      { label: 'Saída', href: '/movimentacoes/saida' },
    ],
  },
  {
    label: 'Moradores',
    href: '/moradores',
    IconComponent: ApartmentRoundedIcon,
  },
  {
    label: 'Visitantes',
    href: '/visitantes',
    IconComponent: BadgeOutlinedIcon,
  },
  {
    label: 'Prestadores de Serviços',
    href: '/prestadores-servicos',
    IconComponent: Groups2RoundedIcon,
  },
  {
    label: 'Eventos',
    href: '/eventos',
    IconComponent: EventRoundedIcon,
  },
  {
    label: 'Ocorrências',
    href: '/ocorrencias',
    IconComponent: ReportProblemRoundedIcon,
  },
  {
    label: 'Autorizações',
    href: '/autorizacoes',
    IconComponent: AssignmentTurnedInRoundedIcon,
  },
  {
    label: 'Relatórios',
    href: '/relatorios',
    IconComponent: HistoryRoundedIcon,
  },
]

export function useSidebarRoutes(): SidebarRoute[] {
  return useMemo(() => sidebarRoutesConfig, [])
}
