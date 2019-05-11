<template>
  <div id="app">
    <m-header>傻京 Music</m-header>
    <div class="tab-wrapper">
      <tab :tabs = "tabs"></tab>
    </div>
  </div>
</template>

<script>
import MHeader from 'components/m-header/m-header'
import Tab from 'components/tab/tab'
import Rank from 'views/rank/rank'
import Recomment from 'views/recomment/recomment'
import Singer from 'views/singer/singer'
import Search from 'views/search/search'

export default {
  components: {
    MHeader,
    Tab
  },
  computed: {
    tabs() {
      return [
        {
          label: '推荐',
          component: Recomment,
          data: {
          }
        },
        {
          label: '歌手',
          component: Singer,
          data: {
          }
        },
        {
          label: '排行',
          component: Rank,
          data: {
          }
        },
        {
          label: '搜索',
          component: Search,
          data: {
          }
        }
      ]
    }
  }
}
</script>

<style lang="stylus">

@import 'common/stylus/variable'

#app
  color: $color-theme
  .tab-wrapper
    bottom: 0;
    left: 0;
    position: fixed;
    right: 0;
    top: 44px;
</style>
