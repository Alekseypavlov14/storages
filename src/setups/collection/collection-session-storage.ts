import { CollectionStorage } from '../../wrappers/collection'
import { SessionStorage } from '../../storages/session-storage'

export class CollectionSessionStorage<Value> extends CollectionStorage<Value> {
  constructor(
    readonly key: string,
    readonly defaultValue: Value | null = null
  ) {
    const sessionStorage = new SessionStorage<Value[]>(key)
    super(sessionStorage, defaultValue)
  }
}
