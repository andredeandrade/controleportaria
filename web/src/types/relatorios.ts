export interface DashboardSummary {
  totalResidents: number
  totalVisitors: number
  totalServiceProviders: number
  totalEvents: number
  totalIncidents: number
  totalAuthorizations: number
  totalActiveAccesses: number
  totalAccessesToday: number
}

export interface DashboardSummaryFilter {
  type: 'day' | 'month'
  value: string
}
