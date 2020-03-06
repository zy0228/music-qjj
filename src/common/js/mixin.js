import { mapGetters, mapMutations, mapActions } from 'vuex'
import { playMode } from 'common/js/config'
import { shuffle } from 'common/js/util'

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

export const playMixin = {
  computed: {
    iconMode() {
      return this.mode === playMode.sequence ? 'icon-sequence' : this.mode === playMode.loop ? 'icon-loop' : 'icon-random'
    },
    ...mapGetters([
      'sequenceList',
      'playList',
      'currentSong',
      'mode',
      'favoriteList'
    ])
  },
  methods: {
    changeMode() {
      const mode = (this.mode + 1) % 3
      this.setPlayMode(mode)
      let list = []
      if (mode === playMode.random) {
        list = shuffle(this.sequenceList)
      } else {
        list = this.sequenceList
      }
      this.setCurrentIndex(this.resetCurrentIndex(list))
      this.setPlayList(list)
    },
    resetCurrentIndex(list) {
      let index = list.findIndex(song => {
        return song.id === this.currentSong.id
      })
      return index
    },
    getFavoriteIcon(song) {
      if (this.isFavorite(song)) {
        return 'icon-favorite'
      }
      return 'icon-not-favorite'
    },
    toggleFavorite(song) {
      console.log('xx')
      if (this.isFavorite(song)) {
        this.deleteFavoriteList(song)
        return
      }
      this.saveFavoriteList(song)
    },
    isFavorite(song) {
      let index = this.favoriteList.findIndex(item => item.id === song.id)
      return index > -1
    },
    ...mapMutations({
      setPlayingState: 'SET_PLAYING_STATE',
      setCurrentIndex: 'SET_CURRENT_INDEX',
      setPlayMode: 'SET_PLAY_MODE',
      setPlayList: 'SET_PLAYLIST'
    }),
    ...mapActions([
      'saveFavoriteList',
      'deleteFavoriteList'
    ])
  }
}

export const searchMixin = {
  data() {
    return {
      query: '',
      refreshDelay: 100
    }
  },
  computed: {
    ...mapGetters([
      'searchHistory'
    ])
  },
  methods: {
    saveSearch() {
      // TODO: 储存到本地storage、vuex中
      this.saveStorage(this.query)
    },
    blurInput() {
      this.$refs.searchBox.blur()
    },
    onQuqeryChange(query) {
      this.query = query
    },
    addQuery(query) {
      this.$refs.searchBox.setQuery(query)
    },
    ...mapActions([
      'saveStorage',
      'deleteStorage'
    ])
  }
}