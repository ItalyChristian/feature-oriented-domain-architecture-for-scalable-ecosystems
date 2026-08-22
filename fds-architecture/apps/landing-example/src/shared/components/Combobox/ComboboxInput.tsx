'use client';

import { useComboboxContext } from './Combobox';
import styles from './Combobox.module.css';

export function ComboboxInput() {
  const { query, setQuery } = useComboboxContext();

  return (
    <input
      className={styles.input}
      value={query}
      onChange={(event) => setQuery(event.target.value)}
      placeholder="Buscar..."
    />
  );
}
