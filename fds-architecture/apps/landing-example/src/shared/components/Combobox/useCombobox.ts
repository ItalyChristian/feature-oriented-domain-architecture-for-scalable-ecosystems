import { useState } from 'react'
import type { ComboboxOption } from './Combobox.types'

export function useCombobox(options: ComboboxOption[]) {
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState<ComboboxOption | null>(null)
  // lógica de filtro, seleção, etc.
  return { query, setQuery, selected, setSelected }
}
