import { CollectionStorage } from '../../wrappers/collection'
import { LocalStorage } from '../../storages/local-storage'

export class CollectionLocalStorage<Value> extends CollectionStorage<Value> {
  constructor(
    readonly key: string,
    readonly defaultValue: Value | null = null
  ) {
    const localStorage = new LocalStorage<Value[]>(key)
    super(localStorage, defaultValue)
  }
}
