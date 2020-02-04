import jsonp from 'common/js/jsonp'
import { commonParams, options } from './config'

export function getTopList() {
  const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg'

  let data = Object.assign({}, commonParams, {
    format: 'jsonp',
    needNewCode: 1,
    uin: 0,
    platform: 'h5'
  })

  return jsonp(url, data, options)
}

export function getTopListSongs(topid) {
  const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg'

  let data = Object.assign({}, commonParams, {
    format: 'jsonp',
    needNewCode: 1,
    topid,
    uin: 0,
    top: 3,
    page: 'detail',
    type: 'top',
    platform: 'h5'
  })

  return jsonp(url, data, options)
}