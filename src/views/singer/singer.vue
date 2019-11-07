<template>
  <div class="singer">
    <list-view
      class="singer-list"
      :data="singerData"
      @select="selectSinger"
    >
    </list-view>
    <router-view></router-view>
  </div>
</template>

<script>
import { ERR_OK } from 'api/config'
import { getSingerList } from 'api/singer'
import Singer from 'common/js/singer'
import ListView from 'base/listview/listview'
import { mapMutations } from 'vuex'

const HOT_NAME = '热门'
const HOT_SINGER_LEN = 10

export default {
  data () {
    return {
      singerData: []
    }
  },
  created() {
    this._getSinger()
  },
  methods: {
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
@import 'common/stylus/variable'

.singer
  position relative
  height 100%
  overflow hidden
  .singer-list
    height 100%
</style>