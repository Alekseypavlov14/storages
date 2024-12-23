import { Selector } from '../types/selector'
import { Storage } from '../types/storage'

export class CollectionStorage<Value> {
  constructor (readonly storage: Storage<Value[]>) {}
  
  getValueBySelector(selector: Selector<Value>) {
    const savedValues: Value[] = this.storage.getValue() || []
    const searchedValue = savedValues.find(selector) ?? this.storage.defaultValue
    return searchedValue
  }

  setValue(value: Value) {
    const savedValues: Value[] = this.storage.getValue() || []
    savedValues.push(value)
    this.storage.setValue(savedValues)
  }
  
  removeValueBySelector(selector: Selector<Value>) {
    const savedValues: Value[] = this.storage.getValue() || []
    const filteredValues = []

    savedValues.forEach((value, index, array) => {
      if (!selector(value, index, array)) filteredValues.push(value)
    })

    this.storage.setValue(savedValues) 
  }

  removeAllValues() {
    this.storage.setValue([])
  }
}