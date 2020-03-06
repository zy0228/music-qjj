<template>
  <div class="search-list" v-show="searches.length">
    <transition-group name="list" tag="ul">
      <li @click="select(item)" class="search-item" v-for="item in searches" :key="item">
        <span class="text">{{item}}</span>
        <span class="icon">
          <i class="icon-delete" @click.stop="deleteHistory(item)"></i>
        </span>
      </li>
    </transition-group>
  </div>
</template>

<script>
export default {
  props: {
    searches: {
      type: Array,
      default() {
        return []
      }
    }
  },
  methods: {
    select(item) {
      this.$emit('select-history', item)
    },
    deleteHistory(item) {
      this.$emit('delete-history', item)
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable'

.search-list
  .search-item
    display flex
    align-items center
    height 40px
    &.list-enter-active, &.list-leave-active
      transition all .1s
    &.list-enter, &.list-leave-to
      height 0
      opacity: 0;
    .text
      flex 1
      color $color-text-l
    .icon
      extend-click()
      .icon-delete
        font-size $font-size-small
        color $color-text-d
</style>
