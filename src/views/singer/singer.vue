<template>
  <div class="singer" ref="singer">
    <list-view
      :data="singerData"
      @select="selectSinger"
      ref="listView"
    >
    </list-view>
    <transition name="slide">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import { ERR_OK } from 'api/config'
import { getSingerList } from 'api/singer'
import Singer from 'common/js/singer'
import ListView from 'base/listview/listview'
import { mapMutations } from 'vuex'
import { playlistMixin } from 'common/js/mixin'

const HOT_NAME = '热门'
const HOT_SINGER_LEN = 10

export default {
  mixins: [playlistMixin],
  data () {
    return {
      singerData: []
    }
  },
  created() {
    this._getSinger()
  },
  methods: {
    handlePlayList(playlist) {
      const bottom = playlist.length > 0 ? '60px' : ''
      this.$refs.singer.style['bottom'] = bottom
      this.$refs.listView.refresh()
    },
    selectSinger(singer) {
      this.$router.push({
        path: `/singer/${singer.id}`
      })
      this.setSinger(singer)
    },
    _getSinger() {
      getSingerList().then(res => {
        if (res.code === ERR_OK) {
          let singers = res.data.list
          this.singerData = this._normalizeSinger(singers)
        }
      })
    },
    _normalizeSinger(list) {
      let map = {
        hot: {
          title: HOT_NAME,
          items: []
        }
      }
      list.forEach((item, index) => {
        if (index < HOT_SINGER_LEN) {
          map.hot.items.push(new Singer({
            id: item.Fsinger_mid,
            name: item.Fsinger_name
          }))
        }
        const key = item.Findex
        if (!map[key]) {
          map[key] = {
            title: key,
            items: []
          }
        }
        map[key].items.push(new Singer({
          id: item.Fsinger_mid,
          name: item.Fsinger_name
        }))
      })
      // 根据需求处理下顺序
      let hot = []
      let ret = []
      for (let key in map) {
        let val = map[key]
        if (val.title.match(/[a-zA-Z]/)) {
          ret.push(val)
        } else if (val.title === HOT_NAME) {
          hot.push(val)
        }
        ret.sort((a, b) => a.title.charCodeAt(0) - b.title.charCodeAt(0))
      }
      return hot.concat(ret)
    },
    ...mapMutations({
      setSinger: 'SET_SINGER'
    })
  },
  components: {
    ListView
  }
}

</script>
<style lang='stylus' scoped>
@import '~common/stylus/variable'

.singer
  position fixed
  top: 88px
  bottom: 0
  width: 100%
  .slide-enter-active, .slide-leave-active
    transition all .3s
  .slide-enter, .slide-leave-to
    transform translate3d(100%, 0, 0)
</style>