'use client'

import Autocomplete from '@mui/material/Autocomplete'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { useState } from 'react'

import { type PersonSearchOption, usePersonSearch } from '@/modules/acessos/hooks/usePersonSearch'
import { type AccessPersonTypeValue, TextField } from '@/modules/form'

type PersonSearchAutocompleteProps = {
  category: AccessPersonTypeValue | ''
  onSelect: (option: PersonSearchOption) => void
}

export function PersonSearchAutocomplete({ category, onSelect }: PersonSearchAutocompleteProps) {
  const [inputValue, setInputValue] = useState('')
  const { options, isFetching, isError } = usePersonSearch(category, inputValue)

  const getNoOptionsText = () => {
    if (inputValue.trim().length < 2) {
      return 'Digite ao menos 2 caracteres para buscar.'
    }

    if (isError) {
      return 'Erro ao buscar cadastros. Tente novamente.'
    }

    return 'Nenhum cadastro encontrado.'
  }

  return (
    <Autocomplete<PersonSearchOption, false, false, false>
      options={options}
      getOptionLabel={(option) => option.name}
      filterOptions={(options) => options}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      value={null}
      inputValue={inputValue}
      onInputChange={(_, value) => setInputValue(value)}
      onChange={(_, option) => {
        if (option) {
          onSelect(option)
        }
      }}
      disabled={category === ''}
      loading={isFetching}
      loadingText="Buscando..."
      noOptionsText={getNoOptionsText()}
      renderInput={(params) => <TextField {...params} placeholder="Nome ou unidade..." />}
      renderOption={(props, option) => {
        const { key, ...optionProps } = props
        const details = [option.document, option.unit].filter(Boolean).join(' • ')

        return (
          <Stack component="li" key={key} {...optionProps} spacing={0.25} sx={{ py: 1 }}>
            <Typography variant="body2">{option.name}</Typography>
            {details ? (
              <Typography variant="caption" color="text.secondary">
                {details}
              </Typography>
            ) : null}
          </Stack>
        )
      }}
    />
  )
}
