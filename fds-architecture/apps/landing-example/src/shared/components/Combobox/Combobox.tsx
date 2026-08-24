'use client';


import type { ComboboxProps } from './Combobox.types';
import { useCombobox } from './useCombobox';
import styles from './Combobox.module.css';
import { ComboboxContext } from './ComboboxContext';

export function Combobox({ options, children }: Readonly<ComboboxProps>) {
  const { query, setQuery, selected, setSelected } = useCombobox(options);

  return (
    <ComboboxContext.Provider value={{ query, setQuery, selected, setSelected, options }}>
      <div className={styles.root}>{children}</div>
    </ComboboxContext.Provider>
  );
}
