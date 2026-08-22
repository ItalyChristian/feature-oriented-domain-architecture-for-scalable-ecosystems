'use client';

import type { ComboboxOption as ComboboxOptionType } from './Combobox.types';
import { useComboboxContext } from './Combobox';
import styles from './Combobox.module.css';

interface ComboboxOptionProps {
  option: ComboboxOptionType;
}

export function ComboboxOption({ option }: Readonly<ComboboxOptionProps>) {
  const { selected, setSelected } = useComboboxContext();
  const isSelected = selected?.value === option.value;

  return (
    <li
      className={isSelected ? styles.optionSelected : styles.option}
      onClick={() => setSelected(option)}
      role="option"
      aria-selected={isSelected}
    >
      {option.label}
    </li>
  );
}
