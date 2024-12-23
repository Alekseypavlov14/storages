import { SessionStorage } from '../../storages/session-storage'
import { CacheStorage } from '../../wrappers/cache'
import { CachedValue } from '../../types/cached-value'

export class CacheSessionStorage<Value> extends CacheStorage<Value> {
  constructor(
    readonly key: string,
    readonly timeout: number,
    readonly defaultValue: Value | null = null
  ) {
    const sessionStorage = new SessionStorage<CachedValue<Value>>(key)
    super(sessionStorage, timeout, defaultValue)
  }
}
