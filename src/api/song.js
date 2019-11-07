import { commonParams, options } from './config'
import jsonp from 'common/js/jsonp'

export default function songVkey(id) {
  let songmid = {
    songmid: id,
    fileName: `C400${id}.m4a`
  }
  let url = "https://c.y.qq.com/base/fcgi-bin/fcg_music_express_mobile3.fcg"
  let data = Object.assign({}, commonParams, songmid, {
    fomat: 'jsonp',
    uin: 0,
    cid: 205361747,
    guid: 5705112900
  })
  return jsonp(url, data, options)
}