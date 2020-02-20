import jsonp from 'common/js/jsonp'
import axios from 'axios'
import { commonParams, options } from './config'

export function hotSearch() {
  const url = 'https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg'

  let data = Object.assign({}, commonParams, {
    format: 'jsonp',
    platform: 'h5',
    uin: 0,
    needNewCode: 0
  })

  return jsonp(url, data, options)
}

export function search(query, page, zhidao, perpage) {
  const url = '/search'

  const data = Object.assign({}, commonParams, {
    w: query,
    p: page,
    catZhida: zhidao ? 1 : 0,
    perpage,
    n: perpage,
    zhidaqu: 1,
    t: 0,
    flag: 1,
    ie: 'utf-8',
    sem: 1,
    aggr: 0,
    remoteplace: 'txt.mqq.all',
    uin: 0,
    needNewCode: 1,
    platform: 'h5'
  })

  return axios.get(url, {
    params: data
  }).then(res => {
    return Promise.resolve(res.data)
  }).catch(e => {
    console.log(e)
  })
}