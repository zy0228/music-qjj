const path = require('path')
const axios = require('axios')

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/music/' : '/',
  chainWebpack: config => {
    config.resolve.alias
      .set('common', resolve('src/common'))
      .set('components', resolve('src/components'))
      .set('api', resolve('src/api'))
      .set('views', resolve('src/views'))
      .set('base', resolve('src/base'))
  },

  devServer: {
    before(app) {
      app.get('/api/getDiscList', (req, res) => {
        let url = 'https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg'

        axios.get(url, {
          headers: {
            referer: 'https://y.qq.com/portal/playlist.html',
            origin: 'https://y.qq.com'
          },
          params: req.query
        }).then(response => {
          res.json(response.data)
        }).catch(e => {
          console.log(e)
        })
      })

      app.get('/api/getSingers', (req, res) => {
        let url = 'https://c.y.qq.com/v8/fcg-bin/v8.fcg'

        axios.get(url, {
          headers: {
            referer: 'https://music.dawkey.top/',
            origin: 'https://y.qq.com'
          },
          params: req.query
        }).then(response => {
          res.json(response.data)
        }).catch(e => {
          console.log(e)
        })
      })

      /**
       * 获取vkey
       * 抓的黄老的接口，嘿嘿
       */
      app.get('/api/getVkey', (req, res) => {
        let url = 'http://ustbhuangyi.com/music/api/getPurlUrl'
        let request = req.query
        let formatParams = {}

        // 将req.query 转换为一个字典
        for (let key in request) {
          formatParams[key] = JSON.parse(request[key])
        }

        axios.post(url, formatParams, {
          headers: {
            referer: 'http://ustbhuangyi.com/music/',
            origin: 'http://ustbhuangyi.com',
            Host: 'ustbhuangyi.com'
          }
        }).then(response => {
          res.json(response.data)
        }).catch(e => { console.log(e) })
      })

      /**
       * 获取歌词
       */
      app.get('/api/getLyric', (req, res) => {
        let url = 'http://ustbhuangyi.com/music/api/lyric'

        axios.get(url, {
          headers: {
            referer: 'https://music.dawkey.top/',
            origin: 'https://y.qq.com'
          },
          params: req.query
        }).then((response) => {
          res.json(response.data)
        }).catch((e) => {
          console.log(e)
        })
      })

      /**
       * 获取推荐歌曲集合列表
       */
      app.get('/api/getSongList', (req, res) => {
        const url = 'https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg'

        axios.get(url, {
          headers: {
            referer: 'https://y.qq.com/n/yqq/playsquare/${req.query.disstid}.htm',
            orign: 'https://y.qq.com'
          },
          params: req.query
        }).then((response) => {
          res.json(response.data)
        }).catch((e) => {
          console.log(e)
        })
      })

      /**
       * @return 搜索
       */
      app.get('/api/search', (req, res) => {
        const url = 'http://ustbhuangyi.com/music/api/search'

        axios.get(url, {
          headers: {
            referer: 'http://ustbhuangyi.com/music/',
            orign: 'https://y.qq.com',
            Host: 'ustbhuangyi.com'
          },
          params: req.query
        }).then((response => {
          res.json(response.data)
        })).catch((e) => {
          console.log(e)
        })
      })
    }
  }
}
