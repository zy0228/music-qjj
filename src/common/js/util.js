const CircularJSON = require('circular-json-es6')

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}
export function shuffle(arr) {
  let arrs = CircularJSON.parse(CircularJSON.stringify(arr))
  for (let i = 0; i < arrs.length; i++) {
    let j = getRandomInt(0, i)
    let t = arrs[i]
    arrs[i] = arrs[j]
    arrs[j] = t
  }
  return arrs
}