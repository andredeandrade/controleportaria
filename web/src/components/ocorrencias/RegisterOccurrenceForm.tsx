'use client'

import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import MenuItem from '@mui/material/MenuItem'
import Stack from '@mui/material/Stack'
import { Controller, useForm } from 'react-hook-form'

import { FormPaper, TextField, TextFieldLabel, TextFieldStack } from '@/components/form'

const OCCURRENCE_TYPE_OPTIONS = [
  { label: 'Orientação', value: 'orientacao' },
  { label: 'Averiguação atitude suspeita', value: 'averiguacao_atitude_suspeita' },
  { label: 'Acesso não autorizado', value: 'acesso_nao_autorizado' },
  { label: 'Veiculo atitude suspeita', value: 'veiculo_atitude_suspeita' },
  { label: 'Discussão conflito', value: 'discussao_conflito' },
  { label: 'Falha tecnica', value: 'falha_tecnica' },
  { label: 'Falta de energia', value: 'falta_energia' },
  { label: 'Falta de agua', value: 'falta_agua' },
  { label: 'Pertubação do sossego', value: 'pertubacao_sossego' },
  { label: 'Incendio', value: 'incendio' },
  { label: 'Emergencia medica', value: 'emergencia_medica' },
  { label: 'Descarte irregular de lixo', value: 'descarte_irregular_lixo' },
  { label: 'Resgate ou invasão animal', value: 'resgate_ou_invasao_animal' },
  { label: 'Furto', value: 'furto' },
  { label: 'Roubo', value: 'roubo' },
  { label: 'Vandalismo', value: 'vandalismo' },
  { label: 'Outro', value: 'outro' },
] as const

type OccurrenceTypeValue = (typeof OCCURRENCE_TYPE_OPTIONS)[number]['value']

type RegisterOccurrenceFormValues = {
  occurrenceType: OccurrenceTypeValue | ''
  date: string
  time: string
  report: string
}

export function RegisterOccurrenceForm() {
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

  const onSubmit = (data: RegisterOccurrenceFormValues) => {
    void data
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
                })}
              />
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
