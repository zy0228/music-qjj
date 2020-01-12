<template>
  <div id="app">
    <m-header>Music</m-header>
    <m-tab></m-tab>
    <router-view></router-view>
    <my-player></my-player>
  </div>
</template>

<script>
import MHeader from 'components/m-header/m-header'
import MTab from 'components/m-tab/m-tab'
import MyPlayer from 'components/my-player'

export default {
  components: {
    MHeader,
    MTab,
    MyPlayer
  }
}
</script>

<style lang="stylus">
</style>
