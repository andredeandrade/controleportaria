'use client'

import AddRoundedIcon from '@mui/icons-material/AddRounded'
import CircularProgress from '@mui/material/CircularProgress'
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import { useRouter } from 'next/navigation'
import { Controller, useFieldArray, useForm } from 'react-hook-form'

import { useCreateAccessRecord } from '@/components/acessos/hooks/useCreateAccessRecord'
import {
  type ColorValue,
  ColorSelect,
  FormPaper,
  type LocomotionValue,
  LocomotionSelect,
  type PersonTypeValue,
  PersonTypeSelect,
  TextField,
  TextFieldLabel,
  TextFieldStack,
} from '@/components/form'
import { useAppSnackbar } from '@/providers'

type PersonFormValues = {
  category: PersonTypeValue | ''
  name: string
  document: string
}

type AccessRegisterFormValues = {
  people: PersonFormValues[]
  company: string
  locomotion: LocomotionValue | ''
  color: ColorValue | ''
  plate: string
  brandModel: string
  observations: string
}

export function AccessRegisterForm() {
  const router = useRouter()
  const createAccessRecordMutation = useCreateAccessRecord()
  const { showError, showSuccess } = useAppSnackbar()

  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AccessRegisterFormValues>({
    defaultValues: {
      people: [{ category: '', name: '', document: '' }],
      company: '',
      locomotion: '',
      color: '',
      plate: '',
      brandModel: '',
      observations: '',
    },
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'people',
  })

  const handleAddPerson = () => {
    append({ category: '', name: '', document: '' })
  }

  const handleRemovePerson = (index: number) => {
    remove(index)
  }

  const onSubmit = async (data: AccessRegisterFormValues) => {
    try {
      await createAccessRecordMutation.mutateAsync({
        people: data.people.map((person) => ({
          category: person.category,
          name: person.name.trim(),
          document: person.document.trim() || undefined,
        })),
        company: data.company.trim() || undefined,
        locomotion: data.locomotion || undefined,
        color: data.color || undefined,
        plate: data.plate.trim() || undefined,
        brandModel: data.brandModel.trim() || undefined,
        observations: data.observations.trim() || undefined,
      })

      showSuccess('Acesso registrado com sucesso.')
      router.push('/acessos?status=active')
      router.refresh()
    } catch (error) {
      showError(error instanceof Error ? error.message : 'Nao foi possivel registrar o acesso.')
    }
  }

  return (
    <FormPaper>
      <Stack component="form" spacing={2.5} onSubmit={handleSubmit(onSubmit)}>
        {fields.map((personField, index) => {
          const isLastPersonRow = index === fields.length - 1
          const canRemovePerson = fields.length > 1 && index > 0

          return (
            <Grid key={personField.id} container spacing={2} alignItems="flex-end">
              <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
                <TextFieldStack>
                  <TextFieldLabel required>Categoria</TextFieldLabel>
                  <Controller
                    control={control}
                    name={`people.${index}.category`}
                    rules={{ required: 'Selecione uma categoria' }}
                    render={({ field }) => (
                      <PersonTypeSelect
                        required
                        error={Boolean(errors.people?.[index]?.category)}
                        helperText={errors.people?.[index]?.category?.message}
                        {...field}
                        value={field.value ?? ''}
                      />
                    )}
                  />
                </TextFieldStack>
              </Grid>

              <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
                <TextFieldStack>
                  <TextFieldLabel required>Nome</TextFieldLabel>
                  <TextField
                    required
                    error={Boolean(errors.people?.[index]?.name)}
                    helperText={errors.people?.[index]?.name?.message}
                    {...register(`people.${index}.name`, {
                      required: 'Informe o nome',
                    })}
                  />
                </TextFieldStack>
              </Grid>

              <Grid size={{ xs: 8, sm: 6, lg: 4 }}>
                <TextFieldStack>
                  <TextFieldLabel>Documentação (CPF/RG)</TextFieldLabel>
                  <TextField {...register(`people.${index}.document`)} />
                </TextFieldStack>
              </Grid>

              <Grid size={{ xs: 4, sm: 6, lg: 2 }}>
                <TextFieldStack>
                  <TextFieldLabel sx={{ visibility: 'hidden' }}>Ações</TextFieldLabel>
                  <Stack direction="row" spacing={1} alignItems="center">
                    {canRemovePerson ? (
                      <IconButton
                        aria-label="Remover pessoa"
                        onClick={() => handleRemovePerson(index)}
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

                    {isLastPersonRow ? (
                      <IconButton
                        aria-label="Adicionar pessoa"
                        onClick={handleAddPerson}
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
          <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
            <TextFieldStack>
              <TextFieldLabel>Empresa</TextFieldLabel>
              <TextField {...register('company')} />
            </TextFieldStack>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, lg: 2 }}>
            <TextFieldStack>
              <TextFieldLabel required>Locomoção</TextFieldLabel>
              <Controller
                control={control}
                name="locomotion"
                rules={{ required: 'Selecione uma locomoção' }}
                render={({ field }) => (
                  <LocomotionSelect
                    required
                    error={Boolean(errors.locomotion)}
                    helperText={errors.locomotion?.message}
                    {...field}
                    value={field.value ?? ''}
                  />
                )}
              />
            </TextFieldStack>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, lg: 2 }}>
            <TextFieldStack>
              <TextFieldLabel>Cor</TextFieldLabel>
              <Controller
                control={control}
                name="color"
                render={({ field }) => <ColorSelect {...field} value={field.value ?? ''} />}
              />
            </TextFieldStack>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, lg: 2 }}>
            <TextFieldStack>
              <TextFieldLabel>Placa</TextFieldLabel>
              <TextField {...register('plate')} />
            </TextFieldStack>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
            <TextFieldStack>
              <TextFieldLabel>Marca - Modelo</TextFieldLabel>
              <TextField {...register('brandModel')} />
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
            disabled={isSubmitting || createAccessRecordMutation.isPending}
            variant="contained"
            sx={{
              bgcolor: '#16A34A',
              '&:hover': {
                bgcolor: '#15803D',
              },
              fontWeight: 700,
            }}
          >
            {isSubmitting || createAccessRecordMutation.isPending ? (
              <Stack direction="row" spacing={1} alignItems="center">
                <CircularProgress size={18} color="inherit" />
                <span>Salvando...</span>
              </Stack>
            ) : (
              'Salvar registro'
            )}
          </Button>
        </Stack>
      </Stack>
    </FormPaper>
  )
}
