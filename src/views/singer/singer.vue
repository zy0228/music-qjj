<template>
  <div>singer</div>
</template>

<script>
import { getSingerList } from 'api/singer'
import { ERR_OK } from 'api/config'

export default {
  data () {
    return {
    }
  },
  created() {
    this._getSingerList()
  },
  methods: {
    _getSingerList() {
      getSingerList().then(res => {
        if (res.code === ERR_OK) {
          console.log(res.data)
        }
      })
    }
  }
}

</script>
<style lang='stylus' scoped>
</style>