# @oleksii-pavlov/storages - List of Utilities for LocalStorage, SessionStorage, and Caching

## Installation

```bash
npm install @oleksii-pavlov/storages
```

## Usage 

The package provides several classes that wrap native APIs to encapsulate repetitive logic like checking for existence, validations, passing keys, and so on. Here’s the list of available classes:

### `LocalStorage`

```typescript
interface NoteEntity {
  message: string
}

const defaultNote: NoteEntity = {
  message: 'Default'
}

const NotesLocalStorage = new LocalStorage<NoteEntity>('notes', defaultNote)

NotesLocalStorage.getValue() // { message: 'Default' }
NotesLocalStorage.setValue({ message: 'Hello' })
NotesLocalStorage.getValue() // { message: 'Hello' }
```

### `SessionStorage`

```typescript
const TokenSessionStorage = new SessionStorage<string>('token')

TokenSessionStorage.getValue() // null 
TokenSessionStorage.setValue('token')
TokenSessionStorage.getValue() // 'token'
```

### `Cache`

```typescript
interface Response {
  data: any[]
}

const APIResponseCache = new Cache<Response>('response', 5000)

APIResponseCache.getValue() // null

APIResponseCache.setValue({ data: [] })
APIResponseCache.getValue() // { data: [] }

setTimeout(() => {
  APIResponseCache.getValue() // null
}, 10000)
```

### `CollectionCache`

The `CollectionCache` class allows for caching collections of items where each element is cached individually with expiration time and selection logic.

```typescript
interface User {
  id: string
  name: string
}

const UserCache = new CollectionCache<User, string>({
  key: 'users',
  timeout: 60_000, // 1 minute
  selector: (user: User) => user.id
})

// Add a user
UserCache.addValue({ id: '1', name: 'Alice' })

// Get all users
const users = UserCache.getValue() // [{ id: '1', name: 'Alice' }]

// Get a user by ID
const user = UserCache.getValueById('1') // { id: '1', name: 'Alice' }

// Remove a user by ID
UserCache.removeValueById('1')
```

## API

### LocalStorage

#### `constructor(key: string, defaultValue: Value | null = null)`

- `key`: The key to store the value under in `localStorage`.
- `defaultValue`: The default value to return if the key does not exist.

#### `getValue(): Value | null`

Returns the stored value or the default value if the key does not exist or an error occurs.

#### `setValue(value: Value): void`

Stores the given value under the specified key in `localStorage`.

### SessionStorage

#### `constructor(key: string, defaultValue: Value | null = null)`

- `key`: The key to store the value under in `sessionStorage`.
- `defaultValue`: The default value to return if the key does not exist.

#### `getValue(): Value | null`

Returns the stored value or the default value if the key does not exist or an error occurs.

#### `setValue(value: Value): void`

Stores the given value under the specified key in `sessionStorage`.

### Cache

#### `constructor(key: string, timeout: number, defaultValue: Value | null = null)`

- `key`: The key to store the value under in `localStorage`.
- `timeout`: The time in milliseconds after which the cached value expires.
- `defaultValue`: The default value to return if the key does not exist or the cached value has expired.

#### `getValue(): Value | null`

Returns the stored value if it has not expired, otherwise returns the default value.

#### `setValue(value: Value): void`

Stores the given value along with the current timestamp under the specified key in `localStorage`.

### CollectionCache

#### `constructor(config: CollectionCacheConfig<Value, Selection>)`

- `config`: An object containing configuration options for the `CollectionCache`:
  - `key`: The key to store the collection under in `localStorage`.
  - `timeout`: The time in milliseconds after which each cached item in the collection expires.
  - `selector`: A function that takes an item from the collection and returns a unique identifier (of type `Selection`) for that item.

#### `getValue(): Value[]`

Returns an array of stored values that have not expired. If no valid items are found, returns an empty array.

#### `setValue(collection: Value[]): void`

Stores an array of values, caching each item individually under the specified key.

#### `removeValue(): Value[]`

Removes the entire collection from the cache and returns the last valid collection of values before removal.

#### `getValueById(id: Selection): Value | null`

Returns a single item from the collection that matches the provided identifier (`id`) using the `selector` function. Returns `null` if the item is not found.

#### `addValue(value: Value): void`

Adds a single item to the cached collection, caching it individually with its own expiration time.

#### `removeValueById(id: Selection): Value | null`

Removes a single item from the cached collection based on its identifier (`id`) and returns the removed value. Returns `null` if the item is not found.
