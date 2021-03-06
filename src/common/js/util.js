function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}
export function shuffle(arr) {
  let arrs = arr.slice()
  for (let i = 0; i < arrs.length; i++) {
    let j = getRandomInt(0, i)
    let t = arrs[i]
    arrs[i] = arrs[j]
    arrs[j] = t
  }
  return arrs
}

// 防抖函数
export function debounce(func, delay) {
  let timer

  return function(...arg) {
    if (timer) clearTimeout(timer)

    timer = setTimeout(() => {
      func.apply(this, arg)
    }, delay)
  }
}