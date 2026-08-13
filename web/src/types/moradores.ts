export enum ResidentRelationEnum {
  PROPRIETARIO = 'proprietario',
  INQUILINO = 'inquilino',
  DEPENDENTE = 'dependente',
}

export enum VehicleTypeEnum {
  CARRO = 'carro',
  MOTO = 'moto',
  OUTRO = 'outro',
}

export const RESIDENT_RELATION_LABEL: Record<ResidentRelationEnum, string> = {
  [ResidentRelationEnum.PROPRIETARIO]: 'Proprietario',
  [ResidentRelationEnum.INQUILINO]: 'Inquilino',
  [ResidentRelationEnum.DEPENDENTE]: 'Dependente',
}

export const VEHICLE_TYPE_LABEL: Record<VehicleTypeEnum, string> = {
  [VehicleTypeEnum.CARRO]: 'Carro',
  [VehicleTypeEnum.MOTO]: 'Moto',
  [VehicleTypeEnum.OUTRO]: 'Outro',
}

export type ResidentVehicleRecord = {
  type: string
  plate: string
}

export type ResidentRecord = {
  id: string
  name: string
  document?: string
  unit: string
  relation: string
  phone: string
  vehicles: ResidentVehicleRecord[]
}

export type ResidentsPaginationState = {
  page: number
  pageSize: number
  total: number
  totalPages: number
}
