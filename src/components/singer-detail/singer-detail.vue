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
import { _normalizeSongs } from 'common/js/song'
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
          let data = res.data.list.map(item => item.musicData)
          _normalizeSongs(data).then(songs => {
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
</style>
