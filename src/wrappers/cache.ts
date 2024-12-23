import { CachedValue } from '../types/cached-value'
import { Storage } from '../types/storage'

export class CacheStorage<Value> {
  readonly defaultValue: Value | null

  constructor (
    readonly storage: Storage<CachedValue<Value>>,
    readonly timeout: number
  ) {
    this.defaultValue = storage.defaultValue?.value ?? null
  }

  getValue(): Value | null {
    const cachedValue: CachedValue<Value> | null = this.storage.getValue() ?? this.storage.defaultValue

    if (!cachedValue) {
      this.storage.removeValue()
      return this.defaultValue
    }
    
    const currentMoment = Date.now()
    const difference = currentMoment - cachedValue.saveMoment

    if (difference > this.timeout) {
      this.storage.removeValue()
      return this.defaultValue
    }

    return cachedValue.value
  }

  setValue(value: Value) {
    const cachedValue = this.prepareCachedValue(value)
    this.storage.setValue(cachedValue)
  }

  removeValue() {
    const cachedValue = this.getValue()
    this.storage.removeValue()
    return cachedValue
  }

  private prepareCachedValue(value: Value): CachedValue<Value> {
    return ({
      value: value,
      saveMoment: Date.now()
    })
  }
}