'use client'

import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import MenuItem from '@mui/material/MenuItem'
import Stack from '@mui/material/Stack'
import { useRouter } from 'next/navigation'
import { Controller, useForm } from 'react-hook-form'

import { useCreateOccurrence } from '@/modules/ocorrencias/hooks/useCreateOccurrence'
import { FormPaper, TextField, TextFieldLabel, TextFieldStack } from '@/modules/form'
import { useAppSnackbar } from '@/providers'
import { OCCURRENCE_TYPE_OPTIONS, type OccurrenceTypeEnum } from '@/types/ocorrencias'

type RegisterOccurrenceFormValues = {
  occurrenceType: OccurrenceTypeEnum | ''
  date: string
  time: string
  report: string
}

export function RegisterOccurrenceForm() {
  const router = useRouter()
  const createOccurrenceMutation = useCreateOccurrence()
  const { showError, showSuccess } = useAppSnackbar()

  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterOccurrenceFormValues>({
    defaultValues: {
      occurrenceType: '',
      date: '',
      time: '',
      report: '',
    },
  })

  const onSubmit = async (data: RegisterOccurrenceFormValues) => {
    try {
      await createOccurrenceMutation.mutateAsync({
        occurrenceType: data.occurrenceType,
        date: data.date,
        time: data.time,
        report: data.report.trim(),
      })

      showSuccess('Ocorrencia registrada com sucesso.')
      router.push('/ocorrencias')
      router.refresh()
    } catch (error) {
      showError(error instanceof Error ? error.message : 'Nao foi possivel registrar a ocorrencia.')
    }
  }

  return (
    <FormPaper>
      <Stack component="form" spacing={2.5} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 6, lg: 6 }}>
            <TextFieldStack>
              <TextFieldLabel required>Tipo de ocorrência</TextFieldLabel>
              <Controller
                control={control}
                name="occurrenceType"
                rules={{ required: 'Selecione o tipo de ocorrência' }}
                render={({ field }) => (
                  <TextField
                    select
                    required
                    error={Boolean(errors.occurrenceType)}
                    helperText={errors.occurrenceType?.message}
                    {...field}
                    value={field.value ?? ''}
                    SelectProps={{ displayEmpty: true }}
                  >
                    <MenuItem value="" disabled>
                      Selecione
                    </MenuItem>
                    {OCCURRENCE_TYPE_OPTIONS.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />
            </TextFieldStack>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
            <TextFieldStack>
              <TextFieldLabel required>Data</TextFieldLabel>
              <TextField
                required
                type="date"
                error={Boolean(errors.date)}
                helperText={errors.date?.message}
                slotProps={{ inputLabel: { shrink: true } }}
                {...register('date', {
                  required: 'Informe a data',
                })}
              />
            </TextFieldStack>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
            <TextFieldStack>
              <TextFieldLabel required>Hora</TextFieldLabel>
              <TextField
                required
                type="time"
                error={Boolean(errors.time)}
                helperText={errors.time?.message}
                slotProps={{ inputLabel: { shrink: true } }}
                {...register('time', {
                  required: 'Informe a hora',
                })}
              />
            </TextFieldStack>
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid size={{ xs: 12 }}>
            <TextFieldStack>
              <TextFieldLabel required>Relato da ocorrência</TextFieldLabel>
              <TextField
                required
                multiline
                minRows={4}
                error={Boolean(errors.report)}
                helperText={errors.report?.message}
                {...register('report', {
                  required: 'Informe o relato da ocorrência',
                  minLength: {
                    value: 5,
                    message: 'Relato deve ter ao menos 5 caracteres',
                  },
                })}
              />
            </TextFieldStack>
          </Grid>
        </Grid>

        <Stack direction="row" justifyContent="flex-end">
          <Button
            type="submit"
            disabled={isSubmitting || createOccurrenceMutation.isPending}
            variant="contained"
            sx={{
              bgcolor: '#16A34A',
              '&:hover': {
                bgcolor: '#15803D',
              },
              fontWeight: 700,
            }}
          >
            {isSubmitting || createOccurrenceMutation.isPending ? 'Salvando...' : 'Salvar registro'}
          </Button>
        </Stack>
      </Stack>
    </FormPaper>
  )
}
