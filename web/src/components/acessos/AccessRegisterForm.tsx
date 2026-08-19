'use client'

import AddRoundedIcon from '@mui/icons-material/AddRounded'
import CircularProgress from '@mui/material/CircularProgress'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import DirectionsCarFilledRoundedIcon from '@mui/icons-material/DirectionsCarFilledRounded'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Controller, useFieldArray, useForm, useWatch } from 'react-hook-form'

import { useCreateAccessRecord } from '@/components/acessos/hooks/useCreateAccessRecord'
import {
  type AccessPersonTypeValue,
  type ColorValue,
  ColorSelect,
  type LocomotionValue,
  LocomotionSelect,
  PersonTypeToggle,
  TextField,
  TextFieldLabel,
  TextFieldStack,
} from '@/components/form'
import { useAppSnackbar } from '@/providers'

type PersonFormValues = {
  category: AccessPersonTypeValue | ''
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

  const watchedPeople = useWatch({ control, name: 'people' })
  const hasServiceProvider = watchedPeople?.some(
    (person) => person.category === 'prestador_servico',
  )

  const [searchQueries, setSearchQueries] = useState<Record<string, string>>({})

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
      router.push('/acessos')
      router.refresh()
    } catch (error) {
      showError(error instanceof Error ? error.message : 'Nao foi possivel registrar o acesso.')
    }
  }

  return (
    <Stack component="form" spacing={5} onSubmit={handleSubmit(onSubmit)}>
      {fields.map((personField, index) => {
        const canRemovePerson = fields.length > 1 && index > 0
        const isFirstPerson = index === 0

        return (
          <Card key={personField.id} sx={{ p: 5, overflow: 'hidden' }}>
            <Stack spacing={3.5}>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography
                  variant="overline"
                  color="text.disabled"
                  sx={{ letterSpacing: '0.08em' }}
                >
                  Pessoa {index + 1}
                </Typography>

                {canRemovePerson ? (
                  <Button
                    size="small"
                    color="inherit"
                    startIcon={<CloseRoundedIcon fontSize="small" />}
                    onClick={() => handleRemovePerson(index)}
                    sx={{ color: 'text.disabled' }}
                  >
                    Remover
                  </Button>
                ) : null}
              </Stack>

              <Controller
                control={control}
                name={`people.${index}.category`}
                rules={{ required: 'Selecione uma categoria' }}
                render={({ field }) => (
                  <PersonTypeToggle
                    value={field.value}
                    onChange={field.onChange}
                    error={Boolean(errors.people?.[index]?.category)}
                    helperText={errors.people?.[index]?.category?.message}
                  />
                )}
              />

              <TextFieldStack>
                <TextFieldLabel>Buscar cadastro</TextFieldLabel>
                <TextField
                  placeholder="Nome, CPF ou unidade..."
                  value={searchQueries[personField.id] ?? ''}
                  onChange={(event) =>
                    setSearchQueries((prev) => ({ ...prev, [personField.id]: event.target.value }))
                  }
                />
              </TextFieldStack>

              <Grid container spacing={3.5}>
                <Grid size={{ xs: 12, sm: 6 }}>
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

                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextFieldStack>
                    <TextFieldLabel>Documento (CPF/RG)</TextFieldLabel>
                    <TextField {...register(`people.${index}.document`)} />
                  </TextFieldStack>
                </Grid>
              </Grid>

              {isFirstPerson && hasServiceProvider ? (
                <TextFieldStack>
                  <TextFieldLabel>Empresa</TextFieldLabel>
                  <TextField {...register('company')} />
                </TextFieldStack>
              ) : null}

              {isFirstPerson ? (
                <>
                  <Grid container spacing={3.5}>
                    <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
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
                          render={({ field }) => (
                            <ColorSelect {...field} value={field.value ?? ''} />
                          )}
                        />
                      </TextFieldStack>
                    </Grid>

                    <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
                      <TextFieldStack>
                        <TextFieldLabel>Placa</TextFieldLabel>
                        <TextField {...register('plate')} />
                      </TextFieldStack>
                    </Grid>

                    <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
                      <TextFieldStack>
                        <TextFieldLabel>Marca - Modelo</TextFieldLabel>
                        <TextField {...register('brandModel')} />
                      </TextFieldStack>
                    </Grid>
                  </Grid>

                  <TextFieldStack>
                    <TextFieldLabel>Observações</TextFieldLabel>
                    <TextField multiline minRows={3} {...register('observations')} />
                  </TextFieldStack>
                </>
              ) : (
                <Stack direction="row" spacing={1} alignItems="center">
                  <DirectionsCarFilledRoundedIcon fontSize="small" sx={{ color: 'text.disabled' }} />
                  <Typography variant="body2" color="text.disabled">
                    Entra no mesmo veículo da Pessoa 1
                  </Typography>
                </Stack>
              )}
            </Stack>
          </Card>
        )
      })}

      <Button
        variant="outlined"
        color="inherit"
        fullWidth
        startIcon={<AddRoundedIcon fontSize="small" />}
        onClick={handleAddPerson}
        sx={{ color: 'text.primary', borderColor: 'rgba(255, 255, 255, 0.1)' }}
      >
        Adicionar pessoa (mesmo veículo)
      </Button>

      <Stack
        direction="row"
        justifyContent="flex-end"
        spacing={1.5}
        sx={{ pt: 2, borderTop: '1px solid', borderColor: 'rgba(255, 255, 255, 0.06)' }}
      >
        <Button
          variant="outlined"
          color="inherit"
          onClick={() => router.back()}
          sx={{ color: 'text.primary', borderColor: 'rgba(255, 255, 255, 0.1)' }}
        >
          Cancelar
        </Button>

        <Button type="submit" disabled={isSubmitting || createAccessRecordMutation.isPending} variant="contained">
          {isSubmitting || createAccessRecordMutation.isPending ? (
            <Stack direction="row" spacing={1} alignItems="center">
              <CircularProgress size={18} color="inherit" />
              <span>Salvando...</span>
            </Stack>
          ) : (
            'Registrar Acesso'
          )}
        </Button>
      </Stack>
    </Stack>
  )
}
