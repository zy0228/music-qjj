import { commonParams, singerType } from './config'
import axios from 'axios'

export function getSingerList () {
  let url = '/getSingers'

  let data = Object.assign({}, commonParams, {
    pagenum: 1,
    pagesize: 100,
    channel: 'singer',
    page: 'list',
    key: singerType.key,
    platform: 'yqq',
    format: 'jsonp',
    needNewCode: 0,
    loginUin: 0,
    hostUin: 0
  })

  return axios.get(url, {
    params: data
  }).then(res => {
    return Promise.resolve(res.data)
  }).catch(e => {
    console.log(e)
  })
}