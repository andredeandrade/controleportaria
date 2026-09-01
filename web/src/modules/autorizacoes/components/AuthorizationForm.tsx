'use client'

import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import { Controller, useForm } from 'react-hook-form'

import type { CreateAuthorizationRequest } from '@/app/api/authorizations/types'
import {
  FormPaper,
  type PersonTypeValue,
  TextField,
  TextFieldLabel,
  TextFieldStack,
  PersonTypeSelect,
} from '@/modules/form'

export type AuthorizationFormValues = {
  authorizedName: string
  personType: PersonTypeValue | ''
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

const DEFAULT_AUTHORIZATION_FORM_VALUES: AuthorizationFormValues = {
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
}

export function mapAuthorizationFormValuesToPayload(
  values: AuthorizationFormValues,
): CreateAuthorizationRequest {
  return {
    authorizedName: values.authorizedName.trim(),
    personType: values.personType,
    document: values.document.trim(),
    phone: values.phone.trim() || undefined,
    company: values.company?.trim() || undefined,
    unit: values.unit.trim(),
    authorizedBy: values.authorizedBy.trim(),
    validFromDate: values.validFromDate,
    validFromTime: values.validFromTime,
    validToDate: values.validToDate,
    validToTime: values.validToTime,
    observations: values.observations.trim() || undefined,
  }
}

type AuthorizationFormProps = {
  defaultValues?: AuthorizationFormValues
  isSubmitting: boolean
  submitLabel: string
  onSubmit: (values: AuthorizationFormValues) => Promise<void> | void
  onCancel: () => void
}

export function AuthorizationForm({
  defaultValues,
  isSubmitting,
  submitLabel,
  onSubmit,
  onCancel,
}: AuthorizationFormProps) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<AuthorizationFormValues>({
    defaultValues: defaultValues ?? DEFAULT_AUTHORIZATION_FORM_VALUES,
  })

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
                {...register('authorizedName', {
                  required: 'Informe o nome do autorizado',
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
                {...register('authorizedBy', {
                  required: 'Informe quem autorizou',
                  minLength: {
                    value: 3,
                    message: 'Autorizado por deve ter ao menos 3 caracteres',
                  },
                })}
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
                {...register('validToDate', {
                  required: 'Informe a data final',
                  validate: (value, formValues) => {
                    if (!formValues.validFromDate) {
                      return true
                    }

                    return (
                      value >= formValues.validFromDate ||
                      'Data final deve ser maior ou igual a data inicial'
                    )
                  },
                })}
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
                {...register('validToTime', {
                  required: 'Informe a hora final',
                  validate: (value, formValues) => {
                    if (!formValues.validFromDate || !formValues.validFromTime) {
                      return true
                    }

                    if (formValues.validToDate > formValues.validFromDate) {
                      return true
                    }

                    if (formValues.validToDate < formValues.validFromDate) {
                      return 'Período final deve ser maior ou igual ao período inicial'
                    }

                    return (
                      value >= formValues.validFromTime ||
                      'Período final deve ser maior ou igual ao período inicial'
                    )
                  },
                })}
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

        <Stack
          direction={{ xs: 'column-reverse', sm: 'row' }}
          justifyContent="flex-end"
          spacing={1.5}
        >
          <Button
            type="button"
            variant="outlined"
            color="inherit"
            onClick={onCancel}
            disabled={isSubmitting}
            sx={{
              color: 'text.primary',
              width: { xs: '100%', sm: 'auto' },
            }}
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting}
            variant="contained"
            color="primary"
            sx={{ width: { xs: '100%', sm: 'auto' } }}
          >
            {isSubmitting ? 'Salvando...' : submitLabel}
          </Button>
        </Stack>
      </Stack>
    </FormPaper>
  )
}
