export function addCls(el, cls) {
  if (hasCls(el, cls)) {
    return
  }
  let newCls = el.className.split(' ')
  newCls.push(cls)
  el.className = newCls.join(' ')
}

export function hasCls(el, cls) {
  const clsReg = new RegExp(`(^|\\s)${cls}(\\s|$)`)
  return clsReg.test(el.className)
}

export function getData(el, name, val) {
  const prefix = 'data-'
  name = prefix + name
  if (val) {
    return el.setAttribute(name, val)
  } else {
    return el.getAttribute(name)
  }
}

let elementStyle = document.createElement('div').style

let vender = (() => {
  let transformNames = {
    webkit: 'webkitTransform',
    Moz: 'MozTransform',
    O: 'OTransform',
    ms: 'msTransform',
    standard: 'transfrom'
  }

  for (let key in transformNames) {
    if (elementStyle[transformNames[key]] !== 'undefined') {
      return key
    }

    return false
  }
})()

export function prefixStyle(style) {
  if (vender === false) {
    return false
  }

  if (vender === 'standard') {
    return style
  }

  return vender + style.charAt(0).toUpperCase() + style.substr(1)
}