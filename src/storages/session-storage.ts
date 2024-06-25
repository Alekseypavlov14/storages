export class SessionStorage<Value> {
  constructor(
    private readonly key: string,
    private readonly defaultValue: Value | null = null
  ) {}

  getValue(): Value | null {
    try {
      const stringifiedItem = sessionStorage.getItem(this.key)
      if (!stringifiedItem) return this.defaultValue

      const parsedItem = JSON.parse(stringifiedItem)
      return parsedItem as Value
    } catch(e) {
      return this.defaultValue
    }
  }

  setValue(value: Value): void {
    const stringifiedItem = JSON.stringify(value)
    sessionStorage.setItem(this.key, stringifiedItem)
  }

  removeValue(): Value | null {
    const savedValue = this.getValue()
    sessionStorage.removeItem(this.key)
    return savedValue
  }
}
