import {clubMap} from "../config/clubMap";

export const isEmpty = (obj) => {
  return obj && Object.keys(obj).length == 0
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
  return arr.sort((a, b) => objAction(a).localeCompare(objAction(b), 'th') * (inverted ? -1 : 1))
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

export const searchKeyword = (arr: any, keyword: string, keySelector: (obj: any) => string) => {
  let topPrimary = [],topSecondary = [], bottom = []
  const keyLength = keyword.length
  arr.forEach((val) => {
    if (keyword === keySelector(val).slice(0, keyLength)) return topPrimary.push(val)
    if (keySelector(val).includes(keyword)) return topSecondary.push(val)
    return bottom.push(val)
  })
  return [...topPrimary, ...topSecondary, ...bottom]
}

export const objToArr = (obj: any) => {
  return Object.keys(obj).map(key => {
    return {clubID: key, ...obj[key]}
  })
}

export const translateClubID = (id: string) => {
  return id in clubMap && clubMap[id]
}