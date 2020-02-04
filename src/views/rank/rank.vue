<template>
  <div class="rank" ref="rank">
    <scroll :data="topList" class="toplist" ref='scroll'>
      <ul>
        <li class="item" v-for="(item, index) in topList" :key="index" @click="selectItem(item)">
          <div class="icon">
            <img width="100" height="100" v-lazy="item.picUrl" alt="">
          </div>
          <ul class="songList">
            <li class="song" v-for="(song, i) in item.songList" :key="i">
              <span>{{i+1}}</span>
              <span>{{song.songname}}-{{song.singername}}</span>
            </li>
          </ul>
        </li>
      </ul>
      <div class="loading-container" v-show="!topList.length">
        <Loading></Loading>
      </div>
    </scroll>
    <transition name="slide">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import { getTopList } from 'api/rank'
import { ERR_OK } from 'api/config'
import Scroll from 'base/scroll/scroll'
import { playlistMixin } from 'common/js/mixin'
import Loading from 'base/loading/loading'
import { mapMutations } from 'vuex'
export default {
  mixins: [playlistMixin],
  data () {
    return {
      topList: []
    }
  },
  created() {
    this._getTopList()
  },
  methods: {
    handlePlayList(playlist) {
      const bottom = playlist.length > 0 ? '60px' : 0
      this.$refs.rank.style.bottom = bottom
      this.$refs.scroll.refresh()
    },
    _getTopList() {
      getTopList().then((response) => {
        if (response.code === ERR_OK) {
          this.topList = response.data.topList
        }
      })
    },
    selectItem(item) {
      this.$router.push({
        path: `/rank/${item.id}`
      })
      this.setTopList(item)
    },
    ...mapMutations({
      setTopList: 'SET_TOPLIST'
    })
  },
  components: {
    Scroll,
    Loading
  }
}

</script>
<style lang='stylus' scoped>
@import '~common/stylus/variable'
@import '~common/stylus/mixin'

.rank
  position fixed
  width 100%
  top 88px
  .toplist
    height 100%
    overflow hidden
    .item
      bottom 0
      display flex
      margin 0 20px
      height 100px
      padding-top 20px
      &:last-child
        padding-bottom 20px
      .icon
        flex 0 0 100px
        width 100px
        height 100px
      .songList
        flex 1
        display flex
        flex-direction column
        justify-content center
        padding 0 20px
        height 100px
        overflow hidden
        background $color-highlight-background
        color: $color-text-d
        font-size: $font-size-small
        .song
          no-wrap()
          line-height 26px
    .loading-container
      position absolute
      width 100%
      top 50%
      transform translateY(-50%)
  .slide-enter-active, .slide-leave-active
    transition all .3s ease
  .slide-enter, .slide-leave-to
    transform translate3d(100%, 0, 0)
</style>