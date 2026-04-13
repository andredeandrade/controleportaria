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
  /** Cor de destaque usada no ícone e botão do card de acesso rápido */
  color?: string
  /** Descrição exibida no card de acesso rápido do dashboard */
  description?: string
  /** Exibir como card nos acesso rápido do dashboard. Padrão: true */
  showInQuickLinks?: boolean
}

export type SidebarRoute = {
  label: string
  href?: string
  IconComponent?: ElementType
  children?: SidebarChildRoute[]
  /** Cor de destaque usada no ícone e botão do card de acesso rápido */
  color?: string
  /** Descrição exibida no card de acesso rápido do dashboard */
  description?: string
  /** Exibir como card nos acessos rápidos do dashboard. Padrão: true */
  showInQuickLinks?: boolean
}

const sidebarRoutesConfig: SidebarRoute[] = [
  {
    label: 'Dashboard',
    href: '/dashboard',
    IconComponent: DashboardRoundedIcon,
    showInQuickLinks: false,
  },
  {
    label: 'Movimentações',
    IconComponent: SwapHorizRoundedIcon,
    color: '#06B6D4',
    children: [
      { label: 'Entrada', href: '/movimentacoes/entrada', description: 'Registre a entrada de pessoas no condomínio.' },
      { label: 'Saída', href: '/movimentacoes/saida', description: 'Registre a saída de pessoas do condomínio.' },
    ],
  },
  {
    label: 'Moradores',
    href: '/moradores',
    IconComponent: ApartmentRoundedIcon,
    color: '#3B82F6',
    description: 'Gerencie os moradores e suas unidades.',
  },
  {
    label: 'Visitantes',
    href: '/visitantes',
    IconComponent: BadgeOutlinedIcon,
    color: '#A78BFA',
    description: 'Cadastre e consulte visitantes.',
  },
  {
    label: 'Prestadores de Serviços',
    href: '/prestadores-servicos',
    IconComponent: Groups2RoundedIcon,
    color: '#F59E0B',
    description: 'Gerencie prestadores de serviços autorizados.',
  },
  {
    label: 'Eventos',
    href: '/eventos',
    IconComponent: EventRoundedIcon,
    color: '#10B981',
    description: 'Agende e acompanhe eventos do condomínio.',
  },
  {
    label: 'Ocorrências',
    href: '/ocorrencias',
    IconComponent: ReportProblemRoundedIcon,
    color: '#EF4444',
    description: 'Registre e acompanhe ocorrências.',
  },
  {
    label: 'Autorizações',
    href: '/autorizacoes',
    IconComponent: AssignmentTurnedInRoundedIcon,
    color: '#06B6D4',
    description: 'Gerencie autorizações de acesso.',
  },
  {
    label: 'Relatórios',
    href: '/relatorios',
    IconComponent: HistoryRoundedIcon,
    color: '#F97316',
    description: 'Visualize relatórios de movimentações e eventos.',
  },
]

export function useSidebarRoutes(): SidebarRoute[] {
  return useMemo(() => sidebarRoutesConfig, [])
}
