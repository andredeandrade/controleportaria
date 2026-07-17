export type EventRecord = {
  id: string
  title: string
  date: string
  time: string
  unit: string
  responsibleName: string
  guestsCount: number
}

export type EventsPaginationState = {
  page: number
  pageSize: number
  total: number
  totalPages: number
}
