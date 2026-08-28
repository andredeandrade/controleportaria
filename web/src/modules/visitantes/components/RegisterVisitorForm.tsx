'use client'

import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'

import { FormPaper, TextField, TextFieldLabel, TextFieldStack } from '@/modules/form'
import { useAppSnackbar } from '@/providers'
import { useCreateVisitor } from '@/modules/visitantes/hooks/useCreateVisitor'

type RegisterVisitorFormValues = {
  fullName: string
  document: string
  phone: string
  email: string
  unit: string
  authorizedBy: string
  observations: string
  vehiclePlate: string
  vehicleBrandModel: string
  vehicleColor: string
}

export function RegisterVisitorForm() {
  const router = useRouter()
  const createVisitorMutation = useCreateVisitor()
  const { showError, showSuccess } = useAppSnackbar()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterVisitorFormValues>({
    defaultValues: {
      fullName: '',
      document: '',
      phone: '',
      email: '',
      unit: '',
      authorizedBy: '',
      observations: '',
      vehiclePlate: '',
      vehicleBrandModel: '',
      vehicleColor: '',
    },
  })

  const onSubmit = async (data: RegisterVisitorFormValues) => {
    try {
      await createVisitorMutation.mutateAsync({
        fullName: data.fullName.trim(),
        document: data.document.trim(),
        phone: data.phone.trim() || undefined,
        email: data.email.trim() || undefined,
        unit: data.unit.trim(),
        authorizedBy: data.authorizedBy.trim(),
        observations: data.observations.trim() || undefined,
        vehiclePlate: data.vehiclePlate.trim() || undefined,
        vehicleBrandModel: data.vehicleBrandModel.trim() || undefined,
        vehicleColor: data.vehicleColor.trim() || undefined,
      })

      showSuccess('Visitante registrado com sucesso.')
      router.push('/visitantes')
      router.refresh()
    } catch (error) {
      showError(error instanceof Error ? error.message : 'Nao foi possivel registrar o visitante.')
    }
  }

  return (
    <FormPaper>
      <Stack component="form" spacing={2.5} onSubmit={handleSubmit(onSubmit)}>
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
              <TextFieldLabel required>Autorizado por</TextFieldLabel>
              <TextField
                required
                error={Boolean(errors.authorizedBy)}
                helperText={errors.authorizedBy?.message}
                {...register('authorizedBy', {
                  required: 'Informe o responsável pela autorização',
                })}
              />
            </TextFieldStack>
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 4 }}>
            <TextFieldStack>
              <TextFieldLabel>Placa do veículo</TextFieldLabel>
              <TextField {...register('vehiclePlate')} />
            </TextFieldStack>
          </Grid>

          <Grid size={{ xs: 12, sm: 4 }}>
            <TextFieldStack>
              <TextFieldLabel>Modelo do veículo</TextFieldLabel>
              <TextField {...register('vehicleBrandModel')} />
            </TextFieldStack>
          </Grid>

          <Grid size={{ xs: 12, sm: 4 }}>
            <TextFieldStack>
              <TextFieldLabel>Cor do veículo</TextFieldLabel>
              <TextField {...register('vehicleColor')} />
            </TextFieldStack>
          </Grid>
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
            disabled={isSubmitting || createVisitorMutation.isPending}
            variant="contained"
            sx={{
              bgcolor: '#16A34A',
              '&:hover': {
                bgcolor: '#15803D',
              },
              fontWeight: 700,
            }}
          >
            {isSubmitting || createVisitorMutation.isPending ? 'Salvando...' : 'Salvar registro'}
          </Button>
        </Stack>
      </Stack>
    </FormPaper>
  )
}
