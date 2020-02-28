import storage from 'good-storage'

const SEARCH_KEY = '__search__'
const SEARCH_MAX_SIZE = 15

function insertArray(arr, val, compare, maxLen) {
  const index = arr.findIndex(compare)

  if (index === 0) {
    return
  }

  if (index > 0) {
    arr.splice(index, 1)
  }

  arr.unshift(val)
  if (maxLen && arr.length > maxLen) {
    arr.pop()
  }
}

function deleteFromArray(arr, compare) {
  let index = arr.findIndex(compare)
  if (index > -1) {
    arr.splice(index, 1)
  }
}

export function saveSearch(query) {
  let seraches = storage.get(SEARCH_KEY, [])

  insertArray(seraches, query, (item) => {
    return item === query
  }, SEARCH_MAX_SIZE)
  storage.set(SEARCH_KEY, seraches)

  return seraches
}

export function loadSearch() {
  return storage.get(SEARCH_KEY, [])
}

export function deleteSearch(query) {
  let seraches = storage.get(SEARCH_KEY, [])
  deleteFromArray(seraches, (item) => {
    return item === query
  })
  storage.set(SEARCH_KEY, seraches)

  return seraches
}

export function removeSearch() {
  storage.remove(SEARCH_KEY)
  return []
}