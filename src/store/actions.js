import * as types from './mutation-types'
import { shuffle } from 'common/js/util'
import { playMode } from 'common/js/config'

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

export function setlePlayRandom({ commit }, { list }) {
  commit(types.SET_PLAY_MODE, playMode.random)
  commit(types.SET_SEQUENCELIST, list)
  let randomList = shuffle(list)
  commit(types.SET_PLAYLIST, randomList)
  commit(types.SET_CURRENT_INDEX, 0)
  commit(types.SET_FULL_SCREEN, true)
  commit(types.SET_PLAYING_STATE, true)
}

export function insertSong({commit, state}, song) {
  let playlist = state.playlist
  let sequenceList = state.sequenceList
  let currentIndx = state.currentIndx

  let currentSong = playlist[currentIndx]

  let fpIndex = getCurrentIndx(playlist, song)

  // 插入的位置在当前播放的后面
  currentIndx++
  // 插入
  playlist.splice(currentIndx, 0, song)

  if (fpIndex >  -1) {
    // 如果和添加的歌曲有重复
    if (fpIndex > currentIndx) {
      // 如果位置索引在插入的后面 
      playlist.splice(fpIndex + 1, 1)
    } else {
      // 如果位置索引在插入索引的前面
      playlist.splice(fpIndex, 1)
      // 因为前面减少了一个 所以当前的索引也要--
      currentIndx--
    }
  }
}