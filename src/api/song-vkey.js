import { commonParams, ERR_OK } from './config.js'
import axios from 'axios'

export default function getSongVkey(songmid, songtype) {
  let data = Object.assign({}, commonParams, {
    uin: 0,
    platform: 'h5',
    needNewCode: 1
  })

  return axios.get('/api/getVkey', {
    params: {
      comm: data,
      req_0: {
        module: 'vkey.GetVkeyServer',
        method: 'CgiGetVkey',
        param: {
          guid: '9497492080',
          uin: '0',
          songmid,
          songtype,
          loginflag: 0,
          platform: '23'
        }
      }
    }
  }).then(res => {
    let { code, ...reset } = res.data
    if (code === ERR_OK) {
      // 开发的过程中发现这个接口不是很稳定
      // 处理一下如果没拿到purl的情况

      let isGetter = reset['req_0']['data']['midurlinfo'].some(item => {
        if (item.purl) return true
      })

      return isGetter ? Promise.resolve(reset.req_0) : getSongVkey(songmid, songtype)
    }
  }).catch(e => {
    return Promise.reject(e)
  })
}