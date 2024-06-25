import { CachedValue } from '../types/cached-value'

export class Cache<Value> {
  constructor(
    readonly key: string,
    private readonly timeout: number,
    private readonly defaultValue: Value | null = null
  ) {}

  getValue(): Value | null {
    try {
      const stringifiedItem = localStorage.getItem(this.key)
      if (!stringifiedItem) return this.defaultValue

      const parsedItem = JSON.parse(stringifiedItem) as CachedValue<Value>

      const currentMoment = Date.now()
      const saveMoment = parsedItem.saveMoment

      if (typeof saveMoment !== 'number') {
        this.removeValue()
        return this.defaultValue
      }

      if (currentMoment - saveMoment > this.timeout) {
        this.removeValue()
        return this.defaultValue
      }

      return parsedItem.value
    } catch(e) {
      return this.defaultValue
    }
  }

  setValue(value: Value): void {
    const cachedValue = this.prepareCachedValue(value)
    const stringifiedItem = JSON.stringify(cachedValue)
    localStorage.setItem(this.key, stringifiedItem)
  }

  removeValue(): Value | null {
    const savedValue = this.getValue()
    localStorage.removeItem(this.key)
    return savedValue
  }

  private prepareCachedValue(value: Value): CachedValue<Value> {
    return ({
      value: value,
      saveMoment: Date.now()
    })
  }
}
