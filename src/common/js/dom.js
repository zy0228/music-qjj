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