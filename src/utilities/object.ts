export const isEmpty = (obj) => {
  return Object.keys(obj).length == 0
}

export const sliceObj = (obj, partitions) => {
  const size = Object.keys(obj).length
  const partSize = Math.floor(size / partitions)
  let leftOver = size - (partSize * partitions)
  let result = []
  let initialPointer = 0
  for (let i = 0; i < partitions; i++) {
    let data = []
    const partSizeFinal = partSize + (leftOver > 0 ? 1 : 0)
    Object.keys(obj).slice(initialPointer, initialPointer + partSizeFinal).forEach(val => {
      data.push({
        clubID: val,
        ...obj[val]
      })
    })
    initialPointer += partSizeFinal
    result.push(data)
    leftOver -= 1
  }
  return result
}

export const sortThaiDictionary = (arr: any, objAction: (obj: any) => string, inverted = false) => {
  return arr.sort((a, b) => a.title.localeCompare(b.title, 'th') * (inverted ? -1 : 1))
            .map((val) => {
              return val
            })
}

export const sortAudition = (arr: any, inverted = false) => {
  let top = [], bottom = []
  arr.forEach((val) => {
    if (val.audition === !inverted) return top.push(val)
    return bottom.push(val)
  })
  return [...top, ...bottom]
}

export const searchKeyword = (arr: any, keyword: string) => {
  let top = [], bottom = []
  const keyLength = keyword.length
  arr.forEach((val) => {
    if (keyword === val.title.slice(0, keyLength)) return top.push(val)
    return bottom.push(val)
  })
  if (top.length < 1) {
    top = []
    bottom = []
    arr.forEach((val) => {
      if (val.title.includes(keyword)) return top.push(val)
      return bottom.push(val)
    })
  }
  return [...top, ...bottom]
}

export const objToArr = (obj: any) => {
  return Object.keys(obj).map(key => {
    return {clubID: key, ...obj[key]}
  })
}