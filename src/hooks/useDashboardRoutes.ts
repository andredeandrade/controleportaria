'use client'

import ApartmentRoundedIcon from '@mui/icons-material/ApartmentRounded'
import AssignmentTurnedInRoundedIcon from '@mui/icons-material/AssignmentTurnedInRounded'
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined'
import EventRoundedIcon from '@mui/icons-material/EventRounded'
import Groups2RoundedIcon from '@mui/icons-material/Groups2Rounded'
import HistoryRoundedIcon from '@mui/icons-material/HistoryRounded'
import ReportProblemRoundedIcon from '@mui/icons-material/ReportProblemRounded'
import SwapHorizRoundedIcon from '@mui/icons-material/SwapHorizRounded'
import { useMemo } from 'react'
import type { ElementType } from 'react'

export type DashboardRoute = {
  label: string
  href: string
  description?: string
  color?: string
  buttonLabel?: 'Cadastrar' | 'Registrar' | 'Ver'
  IconComponent?: ElementType
}

const dashboardRoutesConfig: DashboardRoute[] = [
  {
    label: 'Movimentações - Entrada',
    href: '/movimentacoes/entrada/registrar',
    IconComponent: SwapHorizRoundedIcon,
    color: '#06B6D4',
    description: 'Registre a entrada de pessoas no condomínio.',
    buttonLabel: 'Registrar',
  },
  {
    label: 'Movimentações - Saída',
    href: '/movimentacoes/saida/registrar',
    IconComponent: SwapHorizRoundedIcon,
    color: '#06B6D4',
    description: 'Registre a saída de pessoas do condomínio.',
    buttonLabel: 'Registrar',
  },
  {
    label: 'Moradores',
    href: '/moradores/cadastrar',
    IconComponent: ApartmentRoundedIcon,
    color: '#3B82F6',
    description: 'Cadastre moradores e vínculos de unidade.',
    buttonLabel: 'Cadastrar',
  },
  {
    label: 'Visitantes',
    href: '/visitantes/cadastrar',
    IconComponent: BadgeOutlinedIcon,
    color: '#A78BFA',
    description: 'Cadastre visitantes para acesso no condomínio.',
    buttonLabel: 'Cadastrar',
  },
  {
    label: 'Prestadores de Serviços',
    href: '/prestadores-servicos/cadastrar',
    IconComponent: Groups2RoundedIcon,
    color: '#F59E0B',
    description: 'Cadastre prestadores autorizados a entrar.',
    buttonLabel: 'Cadastrar',
  },
  {
    label: 'Eventos',
    href: '/eventos/cadastrar',
    IconComponent: EventRoundedIcon,
    color: '#10B981',
    description: 'Cadastre novos eventos do condomínio.',
    buttonLabel: 'Cadastrar',
  },
  {
    label: 'Ocorrências',
    href: '/ocorrencias/registrar',
    IconComponent: ReportProblemRoundedIcon,
    color: '#EF4444',
    description: 'Registre ocorrências para acompanhamento.',
    buttonLabel: 'Registrar',
  },
  {
    label: 'Autorizações',
    href: '/autorizacoes/cadastrar',
    IconComponent: AssignmentTurnedInRoundedIcon,
    color: '#06B6D4',
    description: 'Cadastre autorizações de acesso.',
    buttonLabel: 'Cadastrar',
  },
  {
    label: 'Relatórios',
    href: '/relatorios',
    IconComponent: HistoryRoundedIcon,
    color: '#F97316',
    description: 'Visualize relatórios de movimentações e eventos.',
    buttonLabel: 'Ver',
  },
]

export function useDashboardRoutes(): DashboardRoute[] {
  return useMemo(() => dashboardRoutesConfig, [])
}
