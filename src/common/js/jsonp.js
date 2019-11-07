import originJSONP from 'jsonp'

export default function jsonp(url, data, option) {
  url += (url.indexOf('?') < 0 ? '?' : '&') + param(data)
  return new Promise((resolve, reject) => {
    originJSONP(url, option, (err, data) => {
      if (!err) {
        resolve(data)
      } else {
        reject(err)
      }
    })
  })
}

function param(data) {
  let url = ''
  if (typeof data === 'object') {
    for (let k in data) {
      let values = data[k] !== undefined ? data[k] : ''
      // 这个地方吃了一次亏就是编码习惯符号前后空格 这里随手加了导致url里空格会转译成%20
      url += `&${k}=${encodeURIComponent(values)}`
    }
    return url ? url.substring(1) : ''
  } else {
    throw new TypeError('arguments type of error')
  }
}