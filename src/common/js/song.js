import getLyric from 'api/getLyric'
import { ERR_OK } from 'api/config'
import { Base64 } from 'js-base64'
import getSongVkey from 'api/song-vkey'

export default class Song {
  constructor({ id, mid, singer, name, type, album, duration, image, url }) {
    this.id = id
    this.mid = mid
    this.type = type
    this.singer = singer
    this.name = name
    this.album = album
    this.duration = duration
    this.image = image
    this.url = url
  }

  getLyric() {
    if (this.lyric) {
      return Promise.resolve(this.lyric)
    }

    return new Promise((resolve, reject) => {
      getLyric(this.mid).then((res) => {
        if (res.retcode === ERR_OK) {
          this.lyric = Base64.decode(res.lyric)
          resolve(this.lyric)
        } else {
          reject(new Error('error lyric'))
        }
      })
    })
  }
}

export function createSong(musicData) {
  return new Song({
    id: musicData.songid,
    mid: musicData.songmid,
    type: musicData.songtype || musicData.type,
    singer: filterSinger(musicData.singer),
    url: musicData.url,
    name: musicData.songname,
    album: musicData.albumname,
    duration: musicData.interval,
    image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.albummid}.jpg?max_age=2592000`
  })
}

export function filterSinger(singer) {
  let ret = []
  if (!singer) {
    return ''
  }
  singer.forEach(s => {
    ret.push(s.name)
  })
  return ret.join('/')
}

export function _normalizeSongs(list) {
  let ret = []
  list.forEach((musicData) => {
    if (musicData.songid && musicData.albummid) {
      ret.push(createSong(musicData))
    }
  })

  return new Promise((resolve, reject) => {
    getSongUrl(ret).then(songs => {
      resolve(songs)
    })
  })
}

function getSongUrl(songsList) {
  let midMap = songsList.reduce((acc, cur) => acc.concat(cur.mid), [])
  let typeMap = songsList.reduce((acc, cur) => acc.concat(cur.type), [])

  return getSongVkey(midMap, typeMap).then(res => {
    let keyMap = []
    let ret = []
    let { midurlinfo } = res.data

    midurlinfo.forEach((item, index) => {
      keyMap.push(item.purl)
    })

    keyMap.forEach((key, index) => {
      if (key) {
        songsList[index].url = key
        ret.push(songsList[index])
      }
    })

    return Promise.resolve(ret)
  })
}
