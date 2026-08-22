'use client';

import { useComboboxContext } from './Combobox';
import { ComboboxOption as ComboboxOptionItem } from './ComboboxOption';
import styles from './Combobox.module.css';

export function ComboboxOptions() {
  const { query, options } = useComboboxContext();

  const filtered = options.filter((option) =>
    option.label.toLowerCase().includes(query.toLowerCase())
  );

  if (filtered.length === 0) {
    return <p className={styles.empty}>Nenhum resultado encontrado.</p>;
  }

  return (
    <ul className={styles.options}>
      {filtered.map((option) => (
        <ComboboxOptionItem key={option.value} option={option} />
      ))}
    </ul>
  );
}
