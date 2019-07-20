<template>
  <div>singer</div>
</template>

<script>
import { getSingerList } from 'api/singer'
import { ERR_OK } from 'api/config'
import Singer from 'common/js/singer'

const HOT_NAME = '热门'
const HOT_SINGER_LEN = 10

export default {
  data () {
    return {
      singerData: []
    }
  },
  methods: {
    fetch() {
      getSingerList().then(res => {
        if (res.code === ERR_OK) {
          let singers = res.data.list
          this.singerData = this._normalizeSinger(singers)
          console.log(this.singerData)
        }
      })
    },
    _normalizeSinger(list) {
      let map = {
        hot: {
          name: HOT_NAME,
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
            name: key,
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
        if (val.name.match(/[a-zA-Z]/)) {
          ret.push(val)
        } else if (val.name === HOT_NAME) {
          hot.push(val)
        }
        ret.sort((a, b) => a.name.charCodeAt(0) - b.name.charCodeAt(0))
      }
      return hot.concat(ret)
    }
  }
}

</script>
<style lang='stylus' scoped>
</style>