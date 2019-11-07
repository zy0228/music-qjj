import { commonParams, singerType, options } from './config'
import jsonp from 'common/js/jsonp'
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

export function getSingerDetail(singerId) {
  let url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg'
  let data = Object.assign({}, commonParams, {
    platform: 'yqq',
    needNewCode: 0,
    loginUin: 0,
    hostUin: 0,
    order: 'listen',
    begin: 0,
    num: 100,
    songstatus: 1,
    singermid: singerId
  })

  return jsonp(url, data, options)
}