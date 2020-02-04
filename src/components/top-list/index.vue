<template>
  <music-list :title="title" :bg-image="bgImage" :songs="songs" :rank="rank"></music-list>
</template>

<script type="text/ecmascript-6">
import MusicList from 'components/music-list/music-list'
import { mapGetters } from 'vuex'
import { getTopListSongs } from 'api/rank'
import { ERR_OK } from 'api/config'
import { _normalizeSongs } from 'common/js/song'

export default {
  data() {
    return {
      songs: [],
      rank: true
    }
  },
  computed: {
    title() {
      return this.topList.topTitle
    },
    bgImage() {
      if (this.songs.length) {
        return this.songs[0].image
      }
      return this.topList.picUrl
    },
    ...mapGetters([
      'topList'
    ])
  },
  created() {
    this._getTopList()
  },
  methods: {
    _getTopList() {
      if (!this.topList.id) {
        this.$router.back()
        return
      }
      getTopListSongs(this.topList.id).then(res => {
        if (res.code === ERR_OK) {
          let data = res.songlist.map(item => item.data)
          _normalizeSongs(data).then(res => {
            this.songs = res
          })
        }
      })
    }
  },
  components: {
    MusicList
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
</style>