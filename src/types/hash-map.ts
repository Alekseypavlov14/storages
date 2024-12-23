export type HashMapKey = string | number

export interface HashMap<T> extends Record<HashMapKey, T> {}
