'use client'

import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import { useForm } from 'react-hook-form'

import { FormPaper, TextField, TextFieldLabel, TextFieldStack } from '@/components/form'

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

  const onSubmit = (data: RegisterServiceProviderFormValues) => {
    void data
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
              <TextField type="email" {...register('email')} />
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
            disabled={isSubmitting}
            variant="contained"
            sx={{
              bgcolor: '#16A34A',
              '&:hover': {
                bgcolor: '#15803D',
              },
              fontWeight: 700,
            }}
          >
            Salvar registro
          </Button>
        </Stack>
      </Stack>
    </FormPaper>
  )
}
