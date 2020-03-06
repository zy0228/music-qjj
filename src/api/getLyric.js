import { commonParams } from './config'
import axios from 'axios'

export default function getLyricData(mid) {
  const url = '/api/getLyric'

  const params = Object.assign({}, commonParams, {
    songmid: mid,
    platform: 'yqq',
    hostUin: 0,
    needNewCode: 0,
    categoryId: 10000000,
    pcachetime: +new Date()
  })

  return axios.get(url, {
    params
  }).then(res => {
    return Promise.resolve(res.data)
  })
}