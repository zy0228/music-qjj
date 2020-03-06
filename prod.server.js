const express = require('express')

const app = express()

const router = express.Router()
const axios = require('axios')

router.get('/getDiscList', (req, res) => {
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

router.get('/getSingers', (req, res) => {
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
router.get('/getVkey', (req, res) => {
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
router.get('/getLyric', (req, res) => {
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
router.get('/getSongList', (req, res) => {
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
router.get('/search', (req, res) => {
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

app.use('/api', router)

app.use(express.static('./dist'))

const port = process.env.PORT || 8900

module.exports = app.listen(port, function (err) {
  if (err) {
    console.log(err)
    return
  }
  console.log('Listening at http://localhost:' + port + '\n')
})