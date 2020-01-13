const path = require('path')
const axios = require('axios')

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  chainWebpack: config => {
    config.resolve.alias
      .set('common', resolve('src/common'))
      .set('components', resolve('src/components'))
      .set('api', resolve('src/api'))
      .set('views', resolve('src/views'))
      .set('base', resolve('src/base'))
  },

  css: {
    loaderOptions: {
      stylus: {
        'resolve url': true,
        'import': [
          './src/theme'
        ]
      }
    }
  },

  pluginOptions: {
    'cube-ui': {
      postCompile: true,
      theme: true
    }
  },

  devServer: {
    before(app) {
      app.get('/getDiscList', (req, res) => {
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

      app.get('/getSingers', (req, res) => {
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
      app.get('/getVkey', (req, res) => {
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
      app.get('/getLyric', (req, res) => {
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
    }
  }
}
