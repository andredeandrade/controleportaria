'use client'

import AddRoundedIcon from '@mui/icons-material/AddRounded'
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded'
import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import MenuItem from '@mui/material/MenuItem'
import Stack from '@mui/material/Stack'
import { useRouter } from 'next/navigation'
import { Controller, useFieldArray, useForm } from 'react-hook-form'

import {
  type ColorValue,
  ColorSelect,
  FormPaper,
  TextField,
  TextFieldLabel,
  TextFieldStack,
} from '@/components/form'
import { useCreateResident } from '@/components/moradores/hooks/useCreateResident'

const RESIDENT_RELATION_OPTIONS = [
  { label: 'Proprietário', value: 'proprietario' },
  { label: 'Inquilino', value: 'inquilino' },
  { label: 'Dependente', value: 'dependente' },
] as const

const VEHICLE_TYPE_OPTIONS = [
  { label: 'Carro', value: 'carro' },
  { label: 'Moto', value: 'moto' },
  { label: 'Outro', value: 'outro' },
] as const

type ResidentRelationValue = (typeof RESIDENT_RELATION_OPTIONS)[number]['value']
type VehicleTypeValue = (typeof VEHICLE_TYPE_OPTIONS)[number]['value']

type VehicleFormValues = {
  type: VehicleTypeValue | ''
  color: ColorValue | ''
  plate: string
  brandModel: string
}

type RegisterResidentFormValues = {
  fullName: string
  document: string
  phone: string
  email: string
  unit: string
  relation: ResidentRelationValue | ''
  vehicles: VehicleFormValues[]
  observations: string
}

export function RegisterResidentForm() {
  const router = useRouter()
  const createResidentMutation = useCreateResident()

  const {
    control,
    register,
    getValues,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterResidentFormValues>({
    defaultValues: {
      fullName: '',
      document: '',
      phone: '',
      email: '',
      unit: '',
      relation: '',
      vehicles: [{ type: '', color: '', plate: '', brandModel: '' }],
      observations: '',
    },
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'vehicles',
  })

  const handleAddVehicle = () => {
    append({ type: '', color: '', plate: '', brandModel: '' })
  }

  const handleRemoveVehicle = (index: number) => {
    remove(index)
  }

  const onSubmit = async (data: RegisterResidentFormValues) => {
    await createResidentMutation.mutateAsync({
      fullName: data.fullName.trim(),
      document: data.document.trim(),
      phone: data.phone.trim() || undefined,
      email: data.email.trim() || undefined,
      unit: data.unit.trim(),
      relation: data.relation as ResidentRelationValue,
      observations: data.observations.trim() || undefined,
      vehicles: data.vehicles.map((vehicle) => ({
        type: vehicle.type,
        color: vehicle.color || undefined,
        plate: vehicle.plate.trim() || undefined,
        brandModel: vehicle.brandModel.trim() || undefined,
      })),
    })

    router.push('/moradores')
    router.refresh()
  }

  return (
    <FormPaper>
      <Stack component="form" spacing={2.5} onSubmit={handleSubmit(onSubmit)}>
        {createResidentMutation.isError ? (
          <Alert severity="error">{createResidentMutation.error.message}</Alert>
        ) : null}

        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
            <TextFieldStack>
              <TextFieldLabel required>Nome completo</TextFieldLabel>
              <TextField
                required
                error={Boolean(errors.fullName)}
                helperText={errors.fullName?.message}
                {...register('fullName', {
                  required: 'Informe o nome completo',
                  minLength: {
                    value: 3,
                    message: 'Nome deve ter ao menos 3 caracteres',
                  },
                })}
              />
            </TextFieldStack>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
            <TextFieldStack>
              <TextFieldLabel required>CPF/RG</TextFieldLabel>
              <TextField
                required
                error={Boolean(errors.document)}
                helperText={errors.document?.message}
                {...register('document', {
                  required: 'Informe o documento',
                  minLength: {
                    value: 5,
                    message: 'Documento deve ter ao menos 5 caracteres',
                  },
                })}
              />
            </TextFieldStack>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
            <TextFieldStack>
              <TextFieldLabel>Telefone</TextFieldLabel>
              <TextField {...register('phone')} />
            </TextFieldStack>
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
            <TextFieldStack>
              <TextFieldLabel>E-mail</TextFieldLabel>
              <TextField
                type="email"
                error={Boolean(errors.email)}
                helperText={errors.email?.message}
                {...register('email', {
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: 'Informe um e-mail valido',
                  },
                })}
              />
            </TextFieldStack>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
            <TextFieldStack>
              <TextFieldLabel required>Unidade</TextFieldLabel>
              <TextField
                required
                error={Boolean(errors.unit)}
                helperText={errors.unit?.message}
                {...register('unit', {
                  required: 'Informe a unidade',
                })}
              />
            </TextFieldStack>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
            <TextFieldStack>
              <TextFieldLabel required>Vínculo</TextFieldLabel>
              <Controller
                control={control}
                name="relation"
                rules={{ required: 'Selecione o vínculo' }}
                render={({ field }) => (
                  <TextField
                    select
                    required
                    error={Boolean(errors.relation)}
                    helperText={errors.relation?.message}
                    {...field}
                    value={field.value ?? ''}
                    SelectProps={{ displayEmpty: true }}
                  >
                    <MenuItem value="" disabled>
                      Selecione
                    </MenuItem>
                    {RESIDENT_RELATION_OPTIONS.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />
            </TextFieldStack>
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          {fields.map((vehicleField, index) => {
            const isLastVehicleRow = index === fields.length - 1
            const canRemoveVehicle = fields.length > 1 && index > 0

            return (
              <Grid key={vehicleField.id} size={{ xs: 12 }}>
                <Grid container spacing={2} alignItems="flex-end">
                  <Grid size={{ xs: 12, sm: 6, lg: 2 }}>
                    <TextFieldStack>
                      <TextFieldLabel>Veículo</TextFieldLabel>
                      <Controller
                        control={control}
                        name={`vehicles.${index}.type`}
                        rules={{
                          validate: (value) => {
                            const vehicleData = getValues(`vehicles.${index}`)
                            const hasVehicleDetails = Boolean(
                              vehicleData.color ||
                              vehicleData.plate.trim() ||
                              vehicleData.brandModel.trim(),
                            )

                            if (hasVehicleDetails && !value) {
                              return 'Selecione o tipo do veiculo'
                            }

                            return true
                          },
                        }}
                        render={({ field }) => (
                          <TextField
                            select
                            error={Boolean(errors.vehicles?.[index]?.type)}
                            helperText={errors.vehicles?.[index]?.type?.message}
                            {...field}
                            value={field.value ?? ''}
                            SelectProps={{ displayEmpty: true }}
                          >
                            <MenuItem value="" disabled>
                              Selecione
                            </MenuItem>
                            {VEHICLE_TYPE_OPTIONS.map((option) => (
                              <MenuItem key={option.value} value={option.value}>
                                {option.label}
                              </MenuItem>
                            ))}
                          </TextField>
                        )}
                      />
                    </TextFieldStack>
                  </Grid>

                  <Grid size={{ xs: 12, sm: 6, lg: 2 }}>
                    <TextFieldStack>
                      <TextFieldLabel>Cor</TextFieldLabel>
                      <Controller
                        control={control}
                        name={`vehicles.${index}.color`}
                        render={({ field }) => <ColorSelect {...field} value={field.value ?? ''} />}
                      />
                    </TextFieldStack>
                  </Grid>

                  <Grid size={{ xs: 12, sm: 6, lg: 2 }}>
                    <TextFieldStack>
                      <TextFieldLabel>Placa</TextFieldLabel>
                      <TextField {...register(`vehicles.${index}.plate`)} />
                    </TextFieldStack>
                  </Grid>

                  <Grid size={{ xs: 8, sm: 6, lg: 4 }}>
                    <TextFieldStack>
                      <TextFieldLabel>Marca - Modelo</TextFieldLabel>
                      <TextField {...register(`vehicles.${index}.brandModel`)} />
                    </TextFieldStack>
                  </Grid>

                  <Grid size={{ xs: 4, sm: 6, lg: 2 }}>
                    <TextFieldStack>
                      <TextFieldLabel sx={{ visibility: 'hidden' }}>Ações</TextFieldLabel>
                      <Stack direction="row" spacing={1} alignItems="center">
                        {canRemoveVehicle ? (
                          <IconButton
                            aria-label="Remover veículo"
                            onClick={() => handleRemoveVehicle(index)}
                            sx={{
                              border: '1px solid',
                              borderColor: '#DC2626',
                              bgcolor: '#DC2626',
                              color: '#FFFFFF',
                              borderRadius: 1,
                              '&:hover': {
                                bgcolor: '#B91C1C',
                              },
                            }}
                          >
                            <DeleteOutlineRoundedIcon fontSize="small" />
                          </IconButton>
                        ) : null}

                        {isLastVehicleRow ? (
                          <IconButton
                            aria-label="Adicionar veículo"
                            onClick={handleAddVehicle}
                            sx={{
                              border: '1px solid',
                              borderColor: '#16A34A',
                              bgcolor: '#16A34A',
                              color: '#FFFFFF',
                              borderRadius: 1,
                              '&:hover': {
                                bgcolor: '#15803D',
                              },
                            }}
                          >
                            <AddRoundedIcon fontSize="small" />
                          </IconButton>
                        ) : null}
                      </Stack>
                    </TextFieldStack>
                  </Grid>
                </Grid>
              </Grid>
            )
          })}
        </Grid>

        <Grid container spacing={2}>
          <Grid size={{ xs: 12 }}>
            <TextFieldStack>
              <TextFieldLabel>Observações</TextFieldLabel>
              <TextField multiline minRows={3} {...register('observations')} />
            </TextFieldStack>
          </Grid>
        </Grid>

        <Stack direction="row" justifyContent="flex-end">
          <Button
            type="submit"
            disabled={isSubmitting || createResidentMutation.isPending}
            variant="contained"
            sx={{
              bgcolor: '#16A34A',
              '&:hover': {
                bgcolor: '#15803D',
              },
              fontWeight: 700,
            }}
          >
            {isSubmitting || createResidentMutation.isPending ? 'Salvando...' : 'Salvar registro'}
          </Button>
        </Stack>
      </Stack>
    </FormPaper>
  )
}
