export interface Storage<T> {
  getValue: () => T | null
  setValue: (value: T) => void
  removeValue: () => T | null
}
