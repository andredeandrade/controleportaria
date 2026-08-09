import type {
  ServiceProvider,
  ServiceProvidersListResponse,
} from '@/app/api/service-providers/types'

export type ListServiceProvidersApiResponseBody =
  | ({ message?: string } & Partial<ServiceProvidersListResponse>)
  | null

export type RegisterServiceProviderApiResponseBody =
  | ({ message?: string } & Partial<ServiceProvider>)
  | null
