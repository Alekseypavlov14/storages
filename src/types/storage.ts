export interface Storage<T> {
  readonly defaultValue: T | null
  getValue: () => T | null
  setValue: (value: T) => void
  removeValue: () => T | null
}
