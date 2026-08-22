'use client';

import { createContext, useContext } from 'react';
import type { ComboboxOption } from './Combobox.types';
import { useCombobox } from './useCombobox';
import styles from './Combobox.module.css';

interface ComboboxContextValue {
  query: string;
  setQuery: (value: string) => void;
  selected: ComboboxOption | null;
  setSelected: (option: ComboboxOption | null) => void;
  options: ComboboxOption[];
}

const ComboboxContext = createContext<ComboboxContextValue | null>(null);

export function useComboboxContext() {
  const context = useContext(ComboboxContext);
  if (!context) {
    throw new Error('Componentes de Combobox devem ser usados dentro de <Combobox.Root>');
  }
  return context;
}

interface ComboboxProps {
  options: ComboboxOption[];
  children: React.ReactNode;
}

export function Combobox({ options, children }: Readonly<ComboboxProps>) {
  const { query, setQuery, selected, setSelected } = useCombobox(options);

  return (
    <ComboboxContext.Provider value={{ query, setQuery, selected, setSelected, options }}>
      <div className={styles.root}>{children}</div>
    </ComboboxContext.Provider>
  );
}
