'use client'

import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import { useForm, Controller } from 'react-hook-form'

import {
  FormPaper,
  TextField,
  TextFieldLabel,
  TextFieldStack,
  PersonTypeSelect,
} from '@/components/form'

export type RegisterAuthorizationFormValues = {
  authorizedName: string
  personType: string
  document: string
  phone: string
  company?: string
  unit: string
  authorizedBy: string
  validFromDate: string
  validFromTime: string
  validToDate: string
  validToTime: string
  observations: string
}

export function RegisterAuthorizationForm() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<RegisterAuthorizationFormValues>({
    defaultValues: {
      authorizedName: '',
      personType: '',
      document: '',
      phone: '',
      company: '',
      unit: '',
      authorizedBy: '',
      validFromDate: '',
      validFromTime: '',
      validToDate: '',
      validToTime: '',
      observations: '',
    },
  })

  const onSubmit = (data: RegisterAuthorizationFormValues) => {
    void data
  }

  return (
    <FormPaper>
      <Stack component="form" spacing={2.5} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
            <TextFieldStack>
              <TextFieldLabel required>Nome do autorizado</TextFieldLabel>
              <TextField
                required
                error={Boolean(errors.authorizedName)}
                helperText={errors.authorizedName?.message}
                {...register('authorizedName', { required: 'Informe o nome do autorizado' })}
              />
            </TextFieldStack>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
            <TextFieldStack>
              <TextFieldLabel required>Tipo de pessoa</TextFieldLabel>
              <Controller
                control={control}
                name="personType"
                rules={{ required: 'Selecione o tipo de pessoa' }}
                render={({ field: personTypeField }) => (
                  <PersonTypeSelect {...personTypeField} error={Boolean(errors.personType)} />
                )}
              />
            </TextFieldStack>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
            <TextFieldStack>
              <TextFieldLabel required>Documento</TextFieldLabel>
              <TextField
                required
                error={Boolean(errors.document)}
                helperText={errors.document?.message}
                {...register('document', { required: 'Informe o documento' })}
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
              <TextFieldLabel>Empresa</TextFieldLabel>
              <TextField {...register('company')} />
            </TextFieldStack>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
            <TextFieldStack>
              <TextFieldLabel required>Unidade / Proprietário responsável</TextFieldLabel>
              <TextField
                required
                error={Boolean(errors.unit)}
                helperText={errors.unit?.message}
                {...register('unit', { required: 'Informe a unidade ou responsável' })}
              />
            </TextFieldStack>
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
            <TextFieldStack>
              <TextFieldLabel required>Autorizado por</TextFieldLabel>
              <TextField
                required
                error={Boolean(errors.authorizedBy)}
                helperText={errors.authorizedBy?.message}
                {...register('authorizedBy', { required: 'Informe quem autorizou' })}
              />
            </TextFieldStack>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, lg: 2 }}>
            <TextFieldStack>
              <TextFieldLabel required>Data inicial</TextFieldLabel>
              <TextField
                required
                type="date"
                error={Boolean(errors.validFromDate)}
                helperText={errors.validFromDate?.message}
                slotProps={{ inputLabel: { shrink: true } }}
                {...register('validFromDate', { required: 'Informe a data inicial' })}
              />
            </TextFieldStack>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, lg: 2 }}>
            <TextFieldStack>
              <TextFieldLabel required>Hora inicial</TextFieldLabel>
              <TextField
                required
                type="time"
                error={Boolean(errors.validFromTime)}
                helperText={errors.validFromTime?.message}
                slotProps={{ inputLabel: { shrink: true } }}
                {...register('validFromTime', { required: 'Informe a hora inicial' })}
              />
            </TextFieldStack>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, lg: 2 }}>
            <TextFieldStack>
              <TextFieldLabel required>Data final</TextFieldLabel>
              <TextField
                required
                type="date"
                error={Boolean(errors.validToDate)}
                helperText={errors.validToDate?.message}
                slotProps={{ inputLabel: { shrink: true } }}
                {...register('validToDate', { required: 'Informe a data final' })}
              />
            </TextFieldStack>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, lg: 2 }}>
            <TextFieldStack>
              <TextFieldLabel required>Hora final</TextFieldLabel>
              <TextField
                required
                type="time"
                error={Boolean(errors.validToTime)}
                helperText={errors.validToTime?.message}
                slotProps={{ inputLabel: { shrink: true } }}
                {...register('validToTime', { required: 'Informe a hora final' })}
              />
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
              '&:hover': { bgcolor: '#15803D' },
              fontWeight: 700,
            }}
          >
            Salvar autorização
          </Button>
        </Stack>
      </Stack>
    </FormPaper>
  )
}
