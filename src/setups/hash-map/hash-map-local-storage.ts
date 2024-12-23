import { HashMapStorage } from '../../wrappers/hash-map'
import { LocalStorage } from '../../storages/local-storage'
import { HashMap } from '../../types/hash-map'

export class HashMapLocalStorage<Value> extends HashMapStorage<Value> {
  constructor(
    readonly key: string,
    readonly defaultValue: Value | null = null
  ) {
    const localStorage = new LocalStorage<HashMap<Value>>(key)
    super(localStorage, defaultValue)
  }
}
