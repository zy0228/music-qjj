import storage from 'good-storage'

const SEARCH_KEY = '__search__'
const SEARCH_MAX_SIZE = 15

const PLAY_KEY = '__play__'
const PLAY_MAX_SIZE = 200

const FAVORITE_KEY = '__favorite__'
const FAVORITE_MAX_SIZE = 200

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

export function savePlay(song) {
  let songs = storage.get(PLAY_KEY, [])

  insertArray(songs, song, (item) => item.id === song.id, PLAY_MAX_SIZE)

  storage.set(PLAY_KEY, songs)

  return songs
}

export function loadPlay() {
  return storage.get(PLAY_KEY, [])
}

export function saveFavorite(song) {
  let songs = storage.get(FAVORITE_KEY, [])

  insertArray(songs, song, (item) => item.id === song.id, FAVORITE_MAX_SIZE)

  storage.set(FAVORITE_KEY, songs)

  return songs
}

export function deleteFavorite(song) {
  let songs = storage.get(FAVORITE_KEY, [])

  deleteFromArray(songs, (item) => item.id === song.id)

  storage.set(FAVORITE_KEY, songs)

  return songs
}

export function loadFavorite() {
  return storage.get(FAVORITE_KEY, [])
}