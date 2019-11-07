<template>
  <div id="app">
    <m-header>Music</m-header>
    <m-tab></m-tab>
    <router-view></router-view>
  </div>
</template>

<script>
import MHeader from 'components/m-header/m-header'
import MTab from 'components/m-tab/m-tab'

export default {
  components: {
    MHeader,
    MTab
  }
}
</script>

<style lang="stylus">
</style>
