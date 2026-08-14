import { getApiErrorMessage, safeReadJson } from '@/services/shared/http'
import type { DashboardSummary, DashboardSummaryFilter } from '@/types/relatorios'

export class ReportsServiceError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'ReportsServiceError'
  }
}

export async function getDashboardSummary(
  filter?: DashboardSummaryFilter,
): Promise<DashboardSummary> {
  const params = new URLSearchParams()

  if (filter?.type === 'day' && filter.value) {
    params.set('day', filter.value)
  } else if (filter?.type === 'month' && filter.value) {
    params.set('month', filter.value)
  }

  const query = params.toString()
  const url = query ? `/api/reports/dashboard-summary?${query}` : '/api/reports/dashboard-summary'

  const response = await fetch(url, {
    method: 'GET',
    headers: { Accept: 'application/json' },
  })

  const payload = (await safeReadJson(response)) as DashboardSummary

  if (!response.ok) {
    throw new ReportsServiceError(
      getApiErrorMessage(payload, 'Não foi possível carregar o resumo do dashboard.'),
    )
  }

  return payload
}

export interface ReportPage<T> {
  items: T[]
  pagination: { total: number; page: number; pageSize: number; totalPages: number }
}

export async function fetchReportPage<T>(
  path: string,
  params?: URLSearchParams,
): Promise<ReportPage<T>> {
  const query = params?.toString()
  const url = query ? `${path}?${query}` : path

  const response = await fetch(url, {
    method: 'GET',
    headers: { Accept: 'application/json' },
  })

  const payload = (await safeReadJson(response)) as ReportPage<T>

  if (!response.ok) {
    throw new ReportsServiceError(
      getApiErrorMessage(payload, 'Não foi possível carregar os dados do relatório.'),
    )
  }

  return payload
}
