import { HashMap, HashMapKey } from '../types/hash-map'
import { Storage } from '../types/storage'

export class HashMapStorage<Value> {
  constructor (readonly storage: Storage<HashMap<Value>>) {}

  getValueByKey(key: HashMapKey) {
    const savedValues: HashMap<Value> = this.storage.getValue() || {}
    const searchedValue = savedValues[key] ?? this.storage.defaultValue?.[key] ?? null
    return searchedValue
  }

  setValueByKey(key: HashMapKey, value: Value) {
    const savedValues: HashMap<Value> = this.storage.getValue() || {}
    savedValues[key] = value
    this.storage.setValue(savedValues)
  }
  
  removeValueByKey(key: HashMapKey) {
    const savedValues: HashMap<Value> = this.storage.getValue() || {}
    delete savedValues[key]
    this.storage.setValue(savedValues) 
  }

  removeAllValues() {
    this.storage.setValue({})
  }
}
