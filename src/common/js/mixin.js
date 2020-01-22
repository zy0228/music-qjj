import { mapGetters } from 'vuex'

export const playlistMixin = {
  computed: {
    ...mapGetters([
      'playList'
    ])
  },
  mounted() {
    this.handlePlayList(this.playList)
  },
  activated() {
    this.handlePlayList(this.playList)
  },
  methods: {
    handlePlayList() {
      throw new TypeError('component must implements handlePlayList method')
    }
  },
  watch: {
    playList(newVal) {
      this.handlePlayList(newVal)
    }
  }
}