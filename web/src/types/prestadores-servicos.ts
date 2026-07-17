export type ServiceProviderRecord = {
  id: string
  companyName: string
  responsibleName: string
  document: string
  serviceType: string
  phone: string
}

export type ServiceProvidersPaginationState = {
  page: number
  pageSize: number
  total: number
  totalPages: number
}
