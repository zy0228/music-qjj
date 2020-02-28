<template>
  <Scroll
    class="suggest"
    :data="result"
    :pullup="pullup"
    :beforeScroll="beforeScroll"
    @scroll-end="searchMore"
    @beforeScroll="listScroll"
    ref="suggest"
  >
    <ul class="suggest-list">
      <li @click="selectItem(item)" class="suggest-item" v-for="(item, index) in result" :key="index">
        <div class="icon">
          <i :class="getIconCls(item)"></i>
        </div>
        <div class="name">
          <p class="text" v-html="getDisplayName(item)"></p>
        </div>
      </li>
      <Loading v-show="hasMore" title=""></Loading>
    </ul>
    <div v-show="!hasMore && !result.length" class="no-result-wrapper">
      <no-result title="抱歉，暂无更多"></no-result>
    </div>
  </Scroll>
</template>

<script>
import { mapMutations, mapActions } from 'vuex'
import { search } from 'api/search'
import { ERR_OK } from 'api/config'
import { _normalizeSongs } from 'common/js/song'
import Singer from 'common/js/singer'
import Scroll from 'base/scroll/scroll'
import Loading from 'base/loading/loading'
import NoResult from 'base/no-result/no-result'

const TYPE_SINGER = 'singer'
const perpage = 20

export default {
  props: {
    query: {
      type: String,
      default: ''
    },
    showSinger: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      page: 1,
      result: [],
      pullup: true,
      hasMore: false,
      perpage: 20,
      beforeScroll: true
    }
  },
  methods: {
    search() {
      this.page = 1
      this.hasMore = true
      this.result = []
      this.$refs.suggest.scrollTo(0, 0)
      search(this.query, this.page, this.showSinger, perpage).then(result => {
        if (result.code === ERR_OK) {
          if (!result.data.song.list.length) {
            this.result = []
            this.hasMore = false
            return
          }
          this._genresult(result.data).then(res => {
            this.result = res
            this._checkHasMore(result.data)
          })
        }
      })
    },
    selectItem(item) {
      if (item.type === TYPE_SINGER) {
        const singer = new Singer({
          id: item.singermid,
          name: item.singername
        })
        this.$router.push({
          path: `/search/${singer.id}`
        })
        this.setSinger(singer)
      } else {
        this.insertSong(item)
      }

      this.$emit('select')
    },
    listScroll() {
      this.$emit('list-scroll')
    },
    async _genresult(data) {
      let ret = []
      if (data.zhida && data.zhida.singerid) {
        ret.push({ ...data.zhida, ...{ type: TYPE_SINGER } })
      }
      if (data.song) {
        let res = await _normalizeSongs(data.song.list)
        ret = ret.concat(res)
      }

      return ret
    },
    searchMore() {
      if (!this.hasMore) {
        return
      }
      this.page++
      search(this.query, this.page, this.showSinger, perpage).then(result => {
        if (result.code === ERR_OK) {
          this._genresult(result.data).then(res => {
            this.result = this.result.concat(res)
            this._checkHasMore(result.data)
          })
        }
      })
    },
    refresh() {
      this.$refs.suggest.refresh()
    },
    getIconCls(item) {
      if (item.type === TYPE_SINGER) {
        return 'icon-mine'
      } else {
        return 'icon-music'
      }
    },
    getDisplayName(item) {
      if (item.type === TYPE_SINGER) {
        return item.singername
      } else {
        return `${item.name}-${item.singer}`
      }
    },
    _checkHasMore(data) {
      const song = data.song
      if (!song.list.length || (song.curnum + song.curpage * perpage) > song.totalnum) {
        this.hasMore = false
      } else if (this.result.length < perpage) {
        this.searchMore()
      }
    },
    ...mapMutations({
      setSinger: 'SET_SINGER'
    }),
    ...mapActions([
      'insertSong'
    ])
  },
  watch: {
    query(newQuery) {
      if (!newQuery) {
        return
      }
      this.search()
    }
  },
  components: {
    Scroll,
    Loading,
    NoResult
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable'
@import '~common/stylus/mixin'

.suggest
  height 100%
  overflow hidden
  .suggest-list
    padding 0 30px
    .suggest-item
      display flex
      align-items center
      padding-bottom 20px
    .icon
      flex 0 0 30px
      width 30px
      [class^="icon-"]
        font-size 14px
        color $color-text-d
    .name
      flex 1
      font-size $font-size-medium
      color $color-text-d
      overflow hidden
      .text
        no-wrap()
  .no-result-wrapper
    position absolute
    width 100%
    top 50%
    transform translateY(-50%)
</style>
