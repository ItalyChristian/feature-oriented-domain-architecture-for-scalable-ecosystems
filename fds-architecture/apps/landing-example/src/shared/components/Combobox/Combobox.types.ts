export interface ComboboxOption {
  label: string
  value: string
}

export interface ComboboxProps {
  options: ComboboxOption[];
  children: React.ReactNode;
}

export interface ComboboxContextValue {
  query: string;
  setQuery: (value: string) => void;
  selected: ComboboxOption | null;
  setSelected: (option: ComboboxOption | null) => void;
  options: ComboboxOption[];
}
