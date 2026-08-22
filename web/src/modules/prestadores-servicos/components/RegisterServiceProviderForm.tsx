'use client'

import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'

import { FormPaper, TextField, TextFieldLabel, TextFieldStack } from '@/modules/form'
import { useCreateServiceProvider } from '@/modules/prestadores-servicos/hooks/useCreateServiceProvider'
import { useAppSnackbar } from '@/providers'

type RegisterServiceProviderFormValues = {
  companyName: string
  responsibleName: string
  document: string
  phone: string
  email: string
  serviceType: string
  unit: string
  observations: string
}

export function RegisterServiceProviderForm() {
  const router = useRouter()
  const createServiceProviderMutation = useCreateServiceProvider()
  const { showError, showSuccess } = useAppSnackbar()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterServiceProviderFormValues>({
    defaultValues: {
      companyName: '',
      responsibleName: '',
      document: '',
      phone: '',
      email: '',
      serviceType: '',
      unit: '',
      observations: '',
    },
  })

  const onSubmit = async (data: RegisterServiceProviderFormValues) => {
    try {
      await createServiceProviderMutation.mutateAsync({
        companyName: data.companyName.trim(),
        responsibleName: data.responsibleName.trim(),
        document: data.document.trim(),
        phone: data.phone.trim() || undefined,
        email: data.email.trim() || undefined,
        serviceType: data.serviceType.trim(),
        unit: data.unit.trim() || undefined,
        observations: data.observations.trim() || undefined,
      })

      showSuccess('Prestador de servico registrado com sucesso.')
      router.push('/prestadores-servicos')
      router.refresh()
    } catch (error) {
      showError(
        error instanceof Error
          ? error.message
          : 'Nao foi possivel registrar o prestador de servico.',
      )
    }
  }

  return (
    <FormPaper>
      <Stack component="form" spacing={2.5} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
            <TextFieldStack>
              <TextFieldLabel required>Empresa</TextFieldLabel>
              <TextField
                required
                error={Boolean(errors.companyName)}
                helperText={errors.companyName?.message}
                {...register('companyName', {
                  required: 'Informe o nome da empresa',
                  minLength: {
                    value: 3,
                    message: 'Nome da empresa deve ter ao menos 3 caracteres',
                  },
                })}
              />
            </TextFieldStack>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
            <TextFieldStack>
              <TextFieldLabel required>Responsável</TextFieldLabel>
              <TextField
                required
                error={Boolean(errors.responsibleName)}
                helperText={errors.responsibleName?.message}
                {...register('responsibleName', {
                  required: 'Informe o responsável',
                  minLength: {
                    value: 3,
                    message: 'Nome do responsável deve ter ao menos 3 caracteres',
                  },
                })}
              />
            </TextFieldStack>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
            <TextFieldStack>
              <TextFieldLabel required>CNPJ/CPF</TextFieldLabel>
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
        </Grid>

        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
            <TextFieldStack>
              <TextFieldLabel>Telefone</TextFieldLabel>
              <TextField {...register('phone')} />
            </TextFieldStack>
          </Grid>

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
              <TextFieldLabel required>Tipo de serviço</TextFieldLabel>
              <TextField
                required
                error={Boolean(errors.serviceType)}
                helperText={errors.serviceType?.message}
                {...register('serviceType', {
                  required: 'Informe o tipo de serviço',
                })}
              />
            </TextFieldStack>
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid size={{ xs: 12 }}>
            <TextFieldStack>
              <TextFieldLabel>Unidade / Área atendida</TextFieldLabel>
              <TextField {...register('unit')} />
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
            disabled={isSubmitting || createServiceProviderMutation.isPending}
            variant="contained"
            sx={{
              bgcolor: '#16A34A',
              '&:hover': {
                bgcolor: '#15803D',
              },
              fontWeight: 700,
            }}
          >
            {isSubmitting || createServiceProviderMutation.isPending
              ? 'Salvando...'
              : 'Salvar registro'}
          </Button>
        </Stack>
      </Stack>
    </FormPaper>
  )
}
