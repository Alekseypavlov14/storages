import { CachedValue } from '../types/cached-value'

export interface CollectionCacheConfig<Value, Selection> {
  readonly key: string
  readonly timeout: number
  readonly selector: (value: Value) => Selection
}

export class CollectionCache<Value, Selection> {
  private readonly defaultValue: Value[] = []

  constructor(private readonly config: CollectionCacheConfig<Value, Selection>) {}

  getValue(): Value[] {
    try {
      const parsedValue = this.getCachedCollection()

      const validCollectionElements = parsedValue.filter((value) => this.isCollectionElementValid(value))

      return validCollectionElements.map(collectionElement => collectionElement.value)
    } catch(e) {
      return this.defaultValue
    }
  }
  setValue(collection: Value[]): void {
    const cachedCollection = collection.map(this.prepareCachedValue)
    this.setCachedCollection(cachedCollection)
  }
  removeValue(): Value[] {
    const savedValue = this.getValue()
    localStorage.removeItem(this.config.key)
    return savedValue
  }

  getValueById(id: Selection): Value | null {
    const collection = this.getValue()

    const foundElement = collection.find(element => this.config.selector(element) === id) ?? null
    if (foundElement === null) this.removeValueById(id)

    return foundElement
  }
  addValue(value: Value): void {
    try {
      const parsedValue = this.getCachedCollection()

      const filteredValue = parsedValue.filter(cache => {
        return this.config.selector(cache.value) !== this.config.selector(value)
      })

      const newElement = this.prepareCachedValue(value)
      const updatedValue = filteredValue.concat([newElement])

      this.setCachedCollection(updatedValue)
    } catch(e) {}
  }
  removeValueById(id: Selection): Value | null {
    const savedValue = this.getValueById(id)

    const collection = this.getCachedCollection()
    const filteredCollection = collection.filter(element => this.config.selector(element.value) !== id)
    this.setCachedCollection(filteredCollection)

    return savedValue
  }

  private getCachedCollection(): CachedValue<Value>[] {
    try {
      const stringifiedValue = localStorage.getItem(this.config.key)
      if (!stringifiedValue) return []

      const parsedValue = JSON.parse(stringifiedValue) as CachedValue<Value>[]

      return parsedValue
    } catch(e) {
      return []
    }
  }
  private setCachedCollection(collection: CachedValue<Value>[]): void {
    const stringifiedCollection = JSON.stringify(collection)
    localStorage.setItem(this.config.key, stringifiedCollection)
  }

  private prepareCachedValue(value: Value): CachedValue<Value> {
    return ({
      value: value,
      saveMoment: Date.now()
    })
  }
  private isCollectionElementValid(collectionElement: CachedValue<Value>): boolean {
    const now = Date.now()

    const expiresMoment = collectionElement.saveMoment + this.config.timeout

    return expiresMoment >= now
  }
}
