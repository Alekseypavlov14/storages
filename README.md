# @oleksii-pavlov/storages - List of Utilities for LocalStorage, SessionStorage, and Caching

## Installation

```bash
npm install @oleksii-pavlov/storages
```

## Classes

### `LocalStorage<Value>`

Manages values in `localStorage`.

- **Constructor**:
  - `(key: string, defaultValue: Value | null = null)`
- **Methods**:
  - `getValue(): Value | null`
  - `setValue(value: Value): void`
  - `removeValue(): Value | null`

### `SessionStorage<Value>`

Manages values in `sessionStorage`.

- **Constructor**:
  - `(key: string, defaultValue: Value | null = null)`
- **Methods**:
  - `getValue(): Value | null`
  - `setValue(value: Value): void`
  - `removeValue(): Value | null`

### `CacheStorage<Value>`

Implements a caching mechanism with timeout support.

- **Constructor**:
  - `(storage: Storage<CachedValue<Value>>, timeout: number, defaultValue?: Value | null)`
- **Properties**:
  - `readonly defaultValue: Value | null`
- **Methods**:
  - `getValue(): Value | null`
  - `setValue(value: Value): void`
  - `removeValue(): Value | null`

### `CollectionStorage<Value>`

Manages collections of values and allows retrieving or removing them by a selector.

- **Constructor**:
  - `(storage: Storage<Value[]>, defaultValue?: Value | null)`
- **Methods**:
  - `getValueBySelector(selector: Selector<Value>): Value | null`
  - `setValue(value: Value): void`
  - `removeValueBySelector(selector: Selector<Value>): void`
  - `removeAllValues(): void`

### `HashMapStorage<Value>`

Manages a dictionary-like structure of values.

- **Constructor**:
  - `(storage: Storage<HashMap<Value>>, defaultValue?: Value | null)`
- **Methods**:
  - `getValueByKey(key: HashMapKey): Value | null`
  - `setValueByKey(key: HashMapKey, value: Value): void`
  - `removeValueByKey(key: HashMapKey): void`
  - `removeAllValues(): void`

## Interfaces and Types

### `Storage<T>`

Defines a general interface for storage classes.

- **Properties**:
  - `readonly defaultValue: T | null`: The default value returned when no value exists in storage.
- **Methods**:
  - `getValue(): T | null`: Retrieves the value from storage.
  - `setValue(value: T): void`: Saves a value to storage.
  - `removeValue(): T | null`: Removes the value from storage and returns it.

### `CachedValue<T>`

Represents a cached value with metadata.

- **Properties**:
  - `value: T`: The cached value.
  - `saveMoment: number`: The timestamp when the value was cached.

### `Selector<Value>`

Defines a function type used to select specific values from collections.

- **Signature**: `(value: Value, index: number, array: Value[]) => boolean`

### `HashMap<T>`

Represents a dictionary-like structure where keys are strings or numbers.

- **Extends**: `Record<HashMapKey, T>`

### `HashMapKey`

Defines valid keys for a `HashMap`.

- **Type**: `string | number`

## Example Usages

### Setups Overview

The concept of setups provides predefined configurations and wrappers for specific storage use cases, such as managing collections, hash maps, or cached data. These setups streamline implementation by encapsulating the `Storage` logic with a higher-level API, allowing for easy instantiation and reuse across local and session storages. Below, examples showcase how setups simplify the usage of storage classes. **The main purpose of setups is to reduce boilerplate code amount leaving only straightforward parts**. Setups are defined for all wrappers for both local and session storage. They are named as `<Wrapper><Local/Session>Storage`. For example, `CacheLocalStorage` is a cache storage with local storage approach.

### LocalStorage with Setup Example

```typescript
import { CollectionLocalStorage } from '@oleksii-pavlov/storages'

const productStorage = new CollectionLocalStorage<Product>('products', null)

productStorage.setValue({ id: 1, name: 'Laptop', category: 'Electronics', price: 1500 })
productStorage.setValue({ id: 2, name: 'Chair', category: 'Furniture', price: 100 })

const laptop = productStorage.getValueBySelector(product => product.name === 'Laptop')
console.log(laptop) // { id: 1, name: 'Laptop', category: 'Electronics', price: 1500 }
```

### CacheStorage with Setup Example

```typescript
import { CacheLocalStorage } from '@oleksii-pavlov/storages'

const userCache = new CacheLocalStorage<string>('userCache', 60000, 'defaultUser')
userCache.setValue('cachedUser')
console.log(userCache.getValue())
```

### LocalStorage Example

```typescript
const localStorageManager = new LocalStorage<number>('exampleKey', 42)

localStorageManager.setValue(100)
console.log(localStorageManager.getValue()) // 100

localStorageManager.removeValue()
```

### CacheStorage Example

```typescript
const localStorageForCache = new LocalStorage<CachedValue<string>>('cacheKey')
const cache = new CacheStorage(localStorageForCache, 60000, 'defaultCacheValue') // 1-minute timeout

cache.setValue('cachedValue')
console.log(cache.getValue())
```

### CollectionStorage Example

```typescript
interface Product {
  id: number
  name: string
  category: string
  price: number
}

const productStorage = new LocalStorage<Product[]>('products', [])
const productCache = new CollectionStorage(productStorage, null)

// Add new products
productCache.setValue({ id: 1, name: 'Laptop', category: 'Electronics', price: 1500 })
productCache.setValue({ id: 2, name: 'Chair', category: 'Furniture', price: 100 })
productCache.setValue({ id: 3, name: 'Headphones', category: 'Electronics', price: 200 })

// Get a product by selector
const laptop = productCache.getValueBySelector(product => product.name === 'Laptop')
console.log(laptop) // { id: 1, name: 'Laptop', category: 'Electronics', price: 1500 }

// Remove a product by selector
productCache.removeValueBySelector(product => product.id === 2)

// Get all remaining products
const allProducts = productStorage.getValue()
console.log(allProducts)
// [
//   { id: 1, name: 'Laptop', category: 'Electronics', price: 1500 },
//   { id: 3, name: 'Headphones', category: 'Electronics', price: 200 }
// ]

// Remove all products
productCache.removeAllValues()
console.log(productStorage.getValue()) // []
```

### HashMapStorage Example

```typescript
const hashMapStorage = new LocalStorage<HashMap<string>>('hashMapKey', {})
const hashMap = new HashMapStorage(hashMapStorage, 'defaultHashValue')

hashMap.setValueByKey('key1', 'value1')
console.log(hashMap.getValueByKey('key1')) // 'value1'

hashMap.removeValueByKey('key1')
```

