'use client'

import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import MenuItem from '@mui/material/MenuItem'
import Snackbar from '@mui/material/Snackbar'
import { useEffect, useMemo, useState } from 'react'

import { ConfirmExitButton, ExitDialogActions } from '@/components/acessos/styles/AccessStyles'
import { TextField } from '@/components/form'

type ExitRegistrationTarget = {
  id: string
  name: string
  entryAt: string
  people: Array<{
    id: string
    name: string
    isOpen: boolean
  }>
} | null

type AccessExitRegistrationFeedbackProps = {
  target: ExitRegistrationTarget
  onConfirm: (personIds?: string[], observations?: string) => Promise<void>
  isPending: boolean
  errorMessage: string | null
  onClose: () => void
}

export function AccessExitRegistrationFeedback({
  target,
  onConfirm,
  isPending,
  errorMessage,
  onClose,
}: AccessExitRegistrationFeedbackProps) {
  const [isSuccessOpen, setIsSuccessOpen] = useState(false)
  const [selectedPersonId, setSelectedPersonId] = useState<'all' | string>('all')
  const [observations, setObservations] = useState('')

  const openPeople = useMemo(() => target?.people.filter((person) => person.isOpen) ?? [], [target])

  const shouldShowPersonSelection = (target?.people.length ?? 0) > 1
  const selectedPerson = useMemo(
    () => openPeople.find((person) => person.id === selectedPersonId) ?? null,
    [openPeople, selectedPersonId],
  )

  const confirmationText = useMemo(() => {
    if (!target) {
      return ''
    }

    if (shouldShowPersonSelection && selectedPersonId === 'all') {
      return `Deseja confirmar a saída de todas as pessoas deste registro, iniciado em ${target.entryAt}?`
    }

    if (shouldShowPersonSelection && selectedPerson) {
      return `Deseja confirmar a saída de ${selectedPerson.name}, do registro iniciado em ${target.entryAt}?`
    }

    return `Deseja confirmar a saída de ${target.name}, registrado em ${target.entryAt}?`
  }, [selectedPerson, selectedPersonId, shouldShowPersonSelection, target])

  useEffect(() => {
    setSelectedPersonId('all')
    setObservations('')
  }, [target?.id])

  const handleConfirm = async () => {
    if (!target) {
      return
    }

    const isSelectedPersonOpen = openPeople.some((person) => person.id === selectedPersonId)
    const selectedPersonIds =
      selectedPersonId === 'all' || !isSelectedPersonOpen ? undefined : [selectedPersonId]
    const normalizedObservations = observations.trim()
    const checkOutObservations = normalizedObservations ? normalizedObservations : undefined

    try {
      await onConfirm(selectedPersonIds, checkOutObservations)
      onClose()
      setIsSuccessOpen(true)
    } catch {
      // O erro e exibido no proprio dialogo.
    }
  }

  const handleSuccessClose = () => {
    setIsSuccessOpen(false)
  }

  return (
    <>
      <Dialog open={Boolean(target)} onClose={onClose} fullWidth maxWidth="xs">
        <DialogTitle>Confirmar saída</DialogTitle>
        <DialogContent>
          {target && shouldShowPersonSelection ? (
            <TextField
              select
              fullWidth
              size="small"
              label="Quem esta saindo?"
              value={selectedPersonId}
              onChange={(event) => setSelectedPersonId(event.target.value)}
              sx={{ mt: 1 }}
              disabled={isPending}
            >
              <MenuItem value="all">Todos do registro</MenuItem>
              {openPeople.map((person) => (
                <MenuItem key={person.id} value={person.id}>
                  {person.name}
                </MenuItem>
              ))}
            </TextField>
          ) : null}

          <DialogContentText sx={{ mt: 2 }}>{confirmationText}</DialogContentText>

          <TextField
            fullWidth
            multiline
            minRows={3}
            size="small"
            label="Observações da saída (opcional)"
            value={observations}
            onChange={(event) => setObservations(event.target.value)}
            sx={{ mt: 2 }}
            disabled={isPending}
          />

          {errorMessage ? (
            <Alert severity="error" sx={{ mt: 2 }}>
              {errorMessage}
            </Alert>
          ) : null}
        </DialogContent>
        <ExitDialogActions>
          <Button onClick={onClose} color="inherit" disabled={isPending}>
            Cancelar
          </Button>
          <ConfirmExitButton
            onClick={() => void handleConfirm()}
            variant="contained"
            disabled={isPending}
          >
            {isPending ? 'Confirmando...' : 'Confirmar saida'}
          </ConfirmExitButton>
        </ExitDialogActions>
      </Dialog>

      <Snackbar
        open={isSuccessOpen}
        autoHideDuration={3000}
        onClose={handleSuccessClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={handleSuccessClose} severity="success" variant="filled">
          Saída registrada com sucesso.
        </Alert>
      </Snackbar>
    </>
  )
}
