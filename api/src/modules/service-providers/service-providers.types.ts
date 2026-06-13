export interface CreateServiceProviderInput {
  condominiumId: string
  companyName: string
  responsibleName: string
  document: string
  phone?: string
  email?: string
  serviceType: string
  unit?: string
  observations?: string
  createdByUserId: string
}

export interface UpdateServiceProviderInput {
  companyName?: string
  responsibleName?: string
  document?: string
  phone?: string | null
  email?: string | null
  serviceType?: string
  unit?: string | null
  observations?: string | null
}

export interface ListServiceProvidersInput {
  condominiumId: string
  page: number
  pageSize: number
  search?: string
}

export interface ServiceProviderResponse {
  id: string
  companyName: string
  responsibleName: string
  document: string
  phone: string | null
  email: string | null
  serviceType: string
  unit: string | null
  observations: string | null
  createdByUserId: string | null
  createdAt: Date
  updatedAt: Date
}
