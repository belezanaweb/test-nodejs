import EntityBase from './EntityBase'

export const cloneObject = (value) => {
  const clone = {...value } 
  // console.log('111',clone);
  for (let prop in clone) {
    const value = clone[prop]

    if (value === null) continue

    if (value instanceof EntityBase) {
      clone[prop] = value.toJson()
      continue
    }

    if(Array.isArray(value)) {
      clone[prop] = cloneArray(value)
      continue
    }

    if (typeof value === 'object') {
      clone[prop] = cloneObject(value)
    }
  }

  return clone
}

export const cloneArray = (value) => {
  return value.map(el => {
    if (el === null) return el

    if(Array.isArray(el)) {
      return el.map(cloneArray)
    }

    if (el instanceof EntityBase) {
      return el.toJson()
    }

    if (typeof el === 'object') {
      return cloneObject(el)
    }

    return el
  })
}