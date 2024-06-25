# @oleksii-pavlov/storages - list of utils that help to use localStorage, sessionStorage and to cache values

## Installation

```bash
npm install @oleksii-pavlov/storages
```

## Usage 

The package provides several classes that wrap native API to encapsulate repetitive logic like checking for existence, validations, passing keys and so on. Check the list of classes: 

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

setTimeout(() => {
  APIResponseCache.getValue() // null
}, 10000)
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
