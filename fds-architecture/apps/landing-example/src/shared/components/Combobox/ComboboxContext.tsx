import { createContext, useContext } from 'react';
import type { ComboboxContextValue, } from './Combobox.types';

export const ComboboxContext = createContext<ComboboxContextValue | null>(null);

export function useComboboxContext() {
  const context = useContext(ComboboxContext);
  if (!context) {
    throw new Error('Componentes de Combobox devem ser usados dentro de <Combobox.Root>');
  }
  return context;
}

