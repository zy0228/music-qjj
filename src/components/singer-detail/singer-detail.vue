<template>
  <music-list
    :songs="songs"
    :title="title"
    :bg-image="bgImage"
  >
  </music-list>
</template>

<script>
import { ERR_OK } from 'api/config'
import { getSingerDetail } from 'api/singer'
import { mapGetters } from 'vuex'
import { createSong } from 'common/js/song'
import getSongVkey from 'api/song-vkey'
import MusicList from 'components/music-list/music-list'

export default {
  data() {
    return {
      songs: []
    }
  },
  computed: {
    title() {
      return this.singer.name
    },
    bgImage() {
      return this.singer.avatar
    },
    ...mapGetters(['singer'])
  },
  created () {
    this._getDetail()
  },
  methods: {
    _getDetail() {
      if (!this.singer.id) {
        this.$router.push('/singer')
        return
      }
      getSingerDetail(this.singer.id).then(res => {
        if (res.code === ERR_OK) {
          this._normalizeSongs(res.data.list).then(res => {
            this.songs = res
          })
        }
      })
    },
    async _normalizeSongs(list) {
      let ret = []
      let songUrlMap
      let songMid, songType

      songMid = list.reduce((acc, cur) => acc.concat(cur.musicData.songmid), [])
      songType = list.reduce((acc, cur) => acc.concat(cur.musicData.songtype), [])
      songUrlMap = await this._getSongUrl(songMid, songType)

      list.forEach((item, index) => {
        let { musicData } = item

        if (musicData.songid && musicData.albummid) {
          let url = songUrlMap[index]

          // 如果当前的歌曲有url就加入songs数据
          if (url) {
            musicData['url'] = url
            ret.push(createSong(musicData))
          }
        }
      })

      return ret
    },
    _getSongUrl(mid, type) {
      return new Promise(resolve => {
        getSongVkey(mid, type).then(res => {
          let ret = []
          let { midurlinfo } = res.data

          midurlinfo.forEach((item, index) => {
            ret.push(item['purl'])
          })

          resolve(ret)
        })
      })
    }
  },
  components: {
    MusicList
  }
}
</script>

<style lang="stylus" scoped>
</style>
