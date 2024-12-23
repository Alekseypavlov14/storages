import { LocalStorage } from '../../storages/local-storage'
import { CacheStorage } from '../../wrappers/cache'
import { CachedValue } from '../../types/cached-value'

export class CacheLocalStorage<Value> extends CacheStorage<Value> {
  constructor(
    readonly key: string,
    readonly timeout: number,
    readonly defaultValue: Value | null = null
  ) {
    const localStorage = new LocalStorage<CachedValue<Value>>(key)
    super(localStorage, timeout, defaultValue)
  }
}
