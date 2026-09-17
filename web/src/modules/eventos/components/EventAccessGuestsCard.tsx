'use client'

import AddRoundedIcon from '@mui/icons-material/AddRounded'
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded'
import GroupsRoundedIcon from '@mui/icons-material/GroupsRounded'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import MuiCard from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Divider from '@mui/material/Divider'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { useState } from 'react'

import type { Event, EventGuest, EventVehicleMovementType } from '@/app/api/events/types'
import { TextField, TextFieldLabel, TextFieldStack } from '@/modules/form'
import { ListSearchField } from '@/modules/table/components/ListSearchField'

export type NewGuestField = {
  id: string
  name: string
  document: string
}

function isGuestEligible(guest: EventGuest, movementType: EventVehicleMovementType): boolean {
  if (movementType === 'BUSCA') {
    return Boolean(guest.checkInAt) && !guest.checkOutAt
  }

  return !guest.checkInAt || Boolean(guest.checkOutAt)
}

function matchesSearch(guest: EventGuest, searchTerm: string): boolean {
  const normalizedSearch = searchTerm.trim().toLowerCase()

  if (!normalizedSearch) {
    return true
  }

  const name = guest.name.toLowerCase()
  const document = guest.document?.toLowerCase() ?? ''

  return name.includes(normalizedSearch) || document.includes(normalizedSearch)
}

type EventAccessGuestsCardProps = {
  event: Event
  movementType: EventVehicleMovementType
  selectedGuestIds: string[]
  onToggleGuest: (guestId: string) => void
  guestDocuments: Record<string, string>
  onGuestDocumentChange: (guestId: string, value: string) => void
  newGuestFields: NewGuestField[]
  onAppendNewGuest: (value: { name: string; document: string }) => void
  onRemoveNewGuest: (index: number) => void
}

export function EventAccessGuestsCard({
  event,
  movementType,
  selectedGuestIds,
  onToggleGuest,
  guestDocuments,
  onGuestDocumentChange,
  newGuestFields,
  onAppendNewGuest,
  onRemoveNewGuest,
}: EventAccessGuestsCardProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [showNewGuestForm, setShowNewGuestForm] = useState(false)
  const [newGuestName, setNewGuestName] = useState('')
  const [newGuestDocument, setNewGuestDocument] = useState('')

  const canAddNewGuest = movementType !== 'BUSCA'

  const eligibleGuests = event.guests.filter(
    (guest) => isGuestEligible(guest, movementType) && matchesSearch(guest, searchTerm),
  )

  const emptyMessage =
    movementType === 'BUSCA'
      ? 'Nenhum convidado presente no evento para buscar.'
      : 'Nenhum convidado aguardando ou fora do evento para liberar entrada.'

  const handleAddNewGuest = () => {
    if (!newGuestName.trim()) {
      return
    }

    onAppendNewGuest({ name: newGuestName.trim(), document: newGuestDocument.trim() })
    setNewGuestName('')
    setNewGuestDocument('')
  }

  return (
    <MuiCard>
      <CardContent>
        <Stack spacing={2.5}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            flexWrap="wrap"
            rowGap={2}
          >
            <Stack direction="row" spacing={2} alignItems="center">
              <GroupsRoundedIcon color="primary" fontSize="small" />
              <Typography variant="h4">Convidados</Typography>
            </Stack>

            <ListSearchField
              value={searchTerm}
              onChange={setSearchTerm}
              placeholder="Buscar por nome ou documento..."
              sx={{ width: { xs: '100%', sm: 260 } }}
            />
          </Stack>

          {eligibleGuests.length === 0 ? (
            <Typography variant="body2" color="text.secondary">
              {emptyMessage}
            </Typography>
          ) : (
            <Stack spacing={1.5} divider={<Divider sx={{ borderColor: 'divider' }} />}>
              {eligibleGuests.map((guest) => {
                const isSelected = selectedGuestIds.includes(guest.id)
                const needsDocument = isSelected && !guest.document && movementType !== 'BUSCA'

                return (
                  <Stack key={guest.id} spacing={1}>
                    <Stack direction="row" spacing={1.5} alignItems="center">
                      <Checkbox
                        checked={isSelected}
                        onChange={() => onToggleGuest(guest.id)}
                        aria-label={`Selecionar ${guest.name}`}
                      />
                      <Stack spacing={0.25} sx={{ flex: 1 }}>
                        <Typography variant="body2" fontWeight={700} color="text.primary">
                          {guest.name}
                        </Typography>
                        <Typography variant="caption" color="text.disabled">
                          {guest.document ?? 'Sem documento cadastrado'}
                        </Typography>
                      </Stack>
                    </Stack>

                    {needsDocument ? (
                      <TextFieldStack sx={{ pl: 5 }}>
                        <TextFieldLabel required>CPF</TextFieldLabel>
                        <TextField
                          required
                          value={guestDocuments[guest.id] ?? ''}
                          onChange={(event) => onGuestDocumentChange(guest.id, event.target.value)}
                          placeholder="000.000.000-00"
                          sx={{ maxWidth: 260 }}
                        />
                      </TextFieldStack>
                    ) : null}
                  </Stack>
                )
              })}
            </Stack>
          )}

          {canAddNewGuest ? (
            <Stack spacing={1.5}>
              <Divider sx={{ borderColor: 'divider' }} />

              {newGuestFields.length > 0 ? (
                <Stack spacing={1}>
                  <Typography variant="body2" fontWeight={700} color="text.primary">
                    Novos convidados adicionados
                  </Typography>
                  {newGuestFields.map((field, index) => (
                    <Stack
                      key={field.id}
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Stack spacing={0.25}>
                        <Typography variant="body2" color="text.primary">
                          {field.name}
                        </Typography>
                        <Typography variant="caption" color="text.disabled">
                          {field.document || 'Sem documento informado'}
                        </Typography>
                      </Stack>
                      <IconButton
                        aria-label={`Remover ${field.name} da lista`}
                        size="small"
                        color="error"
                        onClick={() => onRemoveNewGuest(index)}
                      >
                        <DeleteOutlineRoundedIcon fontSize="small" />
                      </IconButton>
                    </Stack>
                  ))}
                </Stack>
              ) : null}

              {showNewGuestForm ? (
                <Stack spacing={1.5}>
                  <Grid container spacing={2}>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextFieldStack>
                        <TextFieldLabel required>Nome</TextFieldLabel>
                        <TextField
                          value={newGuestName}
                          onChange={(event) => setNewGuestName(event.target.value)}
                        />
                      </TextFieldStack>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextFieldStack>
                        <TextFieldLabel>CPF</TextFieldLabel>
                        <TextField
                          value={newGuestDocument}
                          onChange={(event) => setNewGuestDocument(event.target.value)}
                          placeholder="000.000.000-00"
                        />
                      </TextFieldStack>
                    </Grid>
                  </Grid>

                  <Button
                    variant="outlined"
                    color="inherit"
                    disabled={!newGuestName.trim()}
                    onClick={handleAddNewGuest}
                    sx={{ alignSelf: 'flex-start' }}
                  >
                    Adicionar à lista
                  </Button>
                </Stack>
              ) : (
                <Button
                  variant="text"
                  color="primary"
                  startIcon={<AddRoundedIcon fontSize="small" />}
                  onClick={() => setShowNewGuestForm(true)}
                  sx={{ alignSelf: 'flex-start' }}
                >
                  Adicionar novo convidado
                </Button>
              )}
            </Stack>
          ) : (
            <Typography variant="caption" color="text.secondary">
              Busca de convidado só aceita convidados já presentes no evento.
            </Typography>
          )}
        </Stack>
      </CardContent>
    </MuiCard>
  )
}
