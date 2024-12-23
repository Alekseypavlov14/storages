import { SessionStorage } from '../../storages/session-storage'
import { HashMapStorage } from '../../wrappers/hash-map'
import { HashMap } from '../../types/hash-map'

export class HashMapSessionStorage<Value> extends HashMapStorage<Value> {
  constructor(
    readonly key: string,
    readonly defaultValue: Value | null = null
  ) {
    const sessionStorage = new SessionStorage<HashMap<Value>>(key)
    super(sessionStorage, defaultValue)
  }
}
