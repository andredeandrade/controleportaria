'use client'

import AddRoundedIcon from '@mui/icons-material/AddRounded'
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import Stack from '@mui/material/Stack'
import { useFieldArray, useForm } from 'react-hook-form'

import { FormPaper, TextField, TextFieldLabel, TextFieldStack } from '@/components/form'

type GuestFormValues = {
  name: string
  document: string
}

type RegisterEventFormValues = {
  title: string
  date: string
  startTime: string
  endTime: string
  unit: string
  responsibleName: string
  guests: GuestFormValues[]
  observations: string
}

export function RegisterEventForm() {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterEventFormValues>({
    defaultValues: {
      title: '',
      date: '',
      startTime: '',
      endTime: '',
      unit: '',
      responsibleName: '',
      guests: [{ name: '', document: '' }],
      observations: '',
    },
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'guests',
  })

  const handleAddGuest = () => {
    append({ name: '', document: '' })
  }

  const handleRemoveGuest = (index: number) => {
    remove(index)
  }

  const onSubmit = (data: RegisterEventFormValues) => {
    void data
  }

  return (
    <FormPaper>
      <Stack component="form" spacing={2.5} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
            <TextFieldStack>
              <TextFieldLabel required>Nome do evento</TextFieldLabel>
              <TextField
                required
                error={Boolean(errors.title)}
                helperText={errors.title?.message}
                {...register('title', {
                  required: 'Informe o nome do evento',
                })}
              />
            </TextFieldStack>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, lg: 2 }}>
            <TextFieldStack>
              <TextFieldLabel required>Data</TextFieldLabel>
              <TextField
                required
                type="date"
                error={Boolean(errors.date)}
                helperText={errors.date?.message}
                slotProps={{ inputLabel: { shrink: true } }}
                {...register('date', {
                  required: 'Informe a data do evento',
                })}
              />
            </TextFieldStack>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, lg: 2 }}>
            <TextFieldStack>
              <TextFieldLabel required>Hora inicial</TextFieldLabel>
              <TextField
                required
                type="time"
                error={Boolean(errors.startTime)}
                helperText={errors.startTime?.message}
                slotProps={{ inputLabel: { shrink: true } }}
                {...register('startTime', {
                  required: 'Informe a hora inicial',
                })}
              />
            </TextFieldStack>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, lg: 2 }}>
            <TextFieldStack>
              <TextFieldLabel>Hora final</TextFieldLabel>
              <TextField
                type="time"
                slotProps={{ inputLabel: { shrink: true } }}
                {...register('endTime')}
              />
            </TextFieldStack>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, lg: 2 }}>
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
        </Grid>

        <Grid container spacing={2}>
          <Grid size={{ xs: 12 }}>
            <TextFieldStack>
              <TextFieldLabel required>Responsável pelo evento</TextFieldLabel>
              <TextField
                required
                error={Boolean(errors.responsibleName)}
                helperText={errors.responsibleName?.message}
                {...register('responsibleName', {
                  required: 'Informe o responsável pelo evento',
                })}
              />
            </TextFieldStack>
          </Grid>
        </Grid>

        {fields.map((guestField, index) => {
          const isLastGuestRow = index === fields.length - 1
          const canRemoveGuest = fields.length > 1 && index > 0

          return (
            <Grid key={guestField.id} container spacing={2} alignItems="flex-end">
              <Grid size={{ xs: 12, sm: 6, lg: 5 }}>
                <TextFieldStack>
                  <TextFieldLabel required>Convidado</TextFieldLabel>
                  <TextField
                    required
                    error={Boolean(errors.guests?.[index]?.name)}
                    helperText={errors.guests?.[index]?.name?.message}
                    {...register(`guests.${index}.name`, {
                      required: 'Informe o nome do convidado',
                    })}
                  />
                </TextFieldStack>
              </Grid>

              <Grid size={{ xs: 8, sm: 6, lg: 5 }}>
                <TextFieldStack>
                  <TextFieldLabel>CPF/RG</TextFieldLabel>
                  <TextField {...register(`guests.${index}.document`)} />
                </TextFieldStack>
              </Grid>

              <Grid size={{ xs: 4, sm: 6, lg: 2 }}>
                <TextFieldStack>
                  <TextFieldLabel sx={{ visibility: 'hidden' }}>Ações</TextFieldLabel>
                  <Stack direction="row" spacing={1} alignItems="center">
                    {canRemoveGuest ? (
                      <IconButton
                        aria-label="Remover convidado"
                        onClick={() => handleRemoveGuest(index)}
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

                    {isLastGuestRow ? (
                      <IconButton
                        aria-label="Adicionar convidado"
                        onClick={handleAddGuest}
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
          )
        })}

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
