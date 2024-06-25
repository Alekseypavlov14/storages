export class LocalStorage<Value> {
  constructor(
    private readonly key: string,
    private readonly defaultValue: Value | null = null
  ) {}

  getValue(): Value | null {
    try {
      const stringifiedItem = localStorage.getItem(this.key)
      if (!stringifiedItem) return this.defaultValue

      const parsedItem = JSON.parse(stringifiedItem)
      return parsedItem as Value
    } catch(e) {
      return this.defaultValue
    }
  }

  setValue(value: Value): void {
    const stringifiedItem = JSON.stringify(value)
    localStorage.setItem(this.key, stringifiedItem)
  }

  removeValue(): Value | null {
    const savedValue = this.getValue()
    localStorage.removeItem(this.key)
    return savedValue
  }
}
