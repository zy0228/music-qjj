<template>
  <music-list
    :title="title"
    :bg-image="bgImage"
    :songs="songs"
  >
  </music-list>
</template>

<script>
import { ERR_OK } from 'api/config'
import MusicList from 'components/music-list/music-list'
import { mapGetters } from 'vuex'
import { getSongList } from 'api/recommend'
import { _normalizeSongs } from 'common/js/song'

export default {
  data() {
    return {
      songs: []
    }
  },
  computed: {
    title() {
      return this.disc.dissname
    },
    bgImage() {
      return this.disc.imgurl
    },
    ...mapGetters([
      'disc'
    ])
  },
  created() {
    this._getSongList()
  },
  methods: {
    _getSongList() {
      if (!this.disc.dissid) {
        this.$router.push({
          path: '/recommend'
        })
        return
      }
      getSongList(this.disc.dissid).then(res => {
        if (res.code === ERR_OK) {
          _normalizeSongs(res.cdlist[0].songlist).then(songs => {
            this.songs = songs
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

<style lang="stylus" scoped>
@import '~common/stylus/variable'
@import '~common/stylus/mixin'
</style>