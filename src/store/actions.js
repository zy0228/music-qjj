import * as types from './mutation-types'
import { shuffle } from 'common/js/util'
import { playMode } from 'common/js/config'
import { saveSearch, deleteSearch, removeSearch, savePlay, saveFavorite, deleteFavorite } from 'common/js/cache'
const CircularJSON = require('circular-json-es6')

function getCurrentIndx(list, song) {
  let index = list.findIndex(item => {
    return item.id === song.id
  })
  return index
}

export function selectPlay({ commit, state }, { list, index }) {
  commit(types.SET_SEQUENCELIST, list)
  if (state.mode === playMode.random) {
    let randomList = shuffle(list)
    commit(types.SET_PLAYLIST, randomList)
    index = getCurrentIndx(randomList, list[index])
    commit(types.SET_CURRENT_INDEX, index)
  } else {
    commit(types.SET_PLAYLIST, list)
  }
  commit(types.SET_CURRENT_INDEX, index)
  commit(types.SET_FULL_SCREEN, true)
  commit(types.SET_PLAYING_STATE, true)
}

export function selectPlayRandom({ commit }, { list }) {
  commit(types.SET_PLAY_MODE, playMode.random)
  commit(types.SET_SEQUENCELIST, list)
  let randomList = shuffle(list)
  commit(types.SET_PLAYLIST, randomList)
  commit(types.SET_CURRENT_INDEX, 0)
  commit(types.SET_FULL_SCREEN, true)
  commit(types.SET_PLAYING_STATE, true)
}

export function insertSong({ commit, state }, song) {
  let playlist = CircularJSON.parse(CircularJSON.stringify(state.playList))
  let sequenceList = CircularJSON.parse(CircularJSON.stringify(state.sequenceList))
  let currentIndex = state.currentIndex
  let currentSong = playlist[currentIndex]

  // 查找当前播放列表中重复的歌曲下表
  let fpIndex = getCurrentIndx(playlist, song)

  // 插入的位置在当前播放的后面
  currentIndex++
  // 插入
  playlist.splice(currentIndex, 0, song)

  if (fpIndex > -1) {
    // 如果和添加的歌曲有重复
    if (fpIndex > currentIndex) {
      // 如果位置索引在插入的后面
      playlist.splice(fpIndex + 1, 1)
    } else {
      // 如果位置索引在插入索引的前面
      playlist.splice(fpIndex, 1)
      // 因为前面减少了一个所以当前的索引也要--
      currentIndex--
    }
  }

  let currentSIndex = getCurrentIndx(sequenceList, currentSong) + 1

  let fsIndex = getCurrentIndx(sequenceList, song)

  sequenceList.splice(currentSIndex, 0, song)

  if (fsIndex > -1) {
    if (currentSIndex > fsIndex) {
      sequenceList.splice(fsIndex, 1)
    } else {
      sequenceList.splice(fsIndex + 1, 1)
    }
  }

  commit(types.SET_PLAYLIST, playlist)
  commit(types.SET_SEQUENCELIST, sequenceList)
  commit(types.SET_CURRENT_INDEX, currentIndex)
  commit(types.SET_PLAYING_STATE, true)
  commit(types.SET_FULL_SCREEN, true)
}

export function saveStorage({ commit }, query) {
  commit(types.SET_SEARCH_HISTORY, saveSearch(query))
}

export function deleteStorage({ commit }, query) {
  commit(types.SET_SEARCH_HISTORY, deleteSearch(query))
}

export function clearSearch({ commit }) {
  commit(types.SET_SEARCH_HISTORY, removeSearch())
}

export const deleteSong = ({ commit, state }, song) => {
  let playlist = state.playList.slice()
  let sequencelist = state.sequenceList.slice()
  let currentIndex = state.currentIndex

  let pIndex = playlist.findIndex(item => song.id === item.id)
  playlist.splice(pIndex, 1)
  let sIndex = sequencelist.findIndex(item => song.id === item.id)
  sequencelist.splice(sIndex, 1)

  if (currentIndex > pIndex || currentIndex === playlist.length) {
    currentIndex--
  }

  commit(types.SET_PLAYLIST, playlist)
  commit(types.SET_SEQUENCELIST, sequencelist)
  commit(types.SET_CURRENT_INDEX, currentIndex)

  let playState = playlist.length > 0

  commit(types.SET_PLAYING_STATE, playState)
}

export const deleteSongList = ({ commit }) => {
  commit(types.SET_PLAYLIST, [])
  commit(types.SET_SEQUENCELIST, [])
  commit(types.SET_CURRENT_INDEX, -1)
  commit(types.SET_PLAYING_STATE, false)
}

export const savePlayHistory = ({ commit }, song) => {
  commit(types.SET_PLAY_HISTORY, savePlay(song))
}

export const saveFavoriteList = ({ commit }, song) => {
  commit(types.SET_FAVORITE_LIST, saveFavorite(song))
}

export const deleteFavoriteList = ({ commit }, song) => {
  commit(types.SET_FAVORITE_LIST, deleteFavorite(song))
}