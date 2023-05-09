import { clubMap } from "../config/clubMap"
import LooseTypeObject from "@interfaces/LooseTypeObject"
import { fixGrammar } from "@utilities/texts"

export const isEmpty = (obj: LooseTypeObject<any> | undefined | null) => {
  return !obj || Object.keys(obj).length == 0
}

export const sliceObj = (obj, partitions) => {
  const size = Object.keys(obj).length
  const partSize = Math.floor(size / partitions)
  let leftOver = size - partSize * partitions
  let result = []
  let initialPointer = 0
  for (let i = 0; i < partitions; i++) {
    let data = []
    const partSizeFinal = partSize + (leftOver > 0 ? 1 : 0)
    Object.keys(obj)
      .slice(initialPointer, initialPointer + partSizeFinal)
      .forEach((val) => {
        data.push({
          clubID: val,
          ...obj[val],
        })
      })
    initialPointer += partSizeFinal
    result.push(data)
    leftOver -= 1
  }
  return result
}

export const sortThaiDictionary = (arr: any, objAction: (obj: any) => string, inverted = false) => {
  return arr
    .sort((a, b) => objAction(a)?.localeCompare(objAction(b), "th") * (inverted ? -1 : 1))
    .map((val) => {
      return val
    })
}

export const sortNumber = (arr: any, objAction: (obj: any) => string, descending = false) => {
  return arr
    .sort((a, b) =>
      descending ? parseInt(objAction(b)) - parseInt(objAction(a)) : parseInt(objAction(a)) - parseInt(objAction(b))
    )
    .map((val) => {
      return val
    })
}

export const sortAudition = (arr: any, inverted = false) => {
  let top = [],
    bottom = []
  arr.forEach((val) => {
    if (val.audition === !inverted) return top.push(val)
    return bottom.push(val)
  })
  return [...top, ...bottom]
}

export const searchKeyword = (arr: any, keyword: string, keySelector: (obj: any) => string) => {
  let topPrimary = [],
    topSecondary = [],
    bottom = []
  const keyLength = keyword.length
  arr.forEach((val) => {
    if (fixGrammar(keyword.toLowerCase()) === fixGrammar(keySelector(val)?.slice(0, keyLength).toLowerCase()))
      // top primary
      return topPrimary.push(val)
    if (fixGrammar(keySelector(val)?.toLowerCase())?.includes(fixGrammar(keyword.toLowerCase())))
      // top secondary
      return topSecondary.push(val)

    // bottom - maybe remove
    // return bottom.push(val)
  })
  return [...topPrimary, ...topSecondary, ...bottom]
}

export const searchKeywordOtimised = (arr: any, keyword: string, keySelector: (obj: any) => string) => {
  let topPrimary = [],
    topSecondary = [],
    bottom = []
  const keyLength = keyword.length
  arr.forEach((val) => {
    if (fixGrammar(keyword.toLowerCase()) === fixGrammar(keySelector(val)?.slice(0, keyLength).toLowerCase()))
      // top primary
      return topPrimary.push(val.clubID)
    if (fixGrammar(keySelector(val)?.toLowerCase())?.includes(fixGrammar(keyword.toLowerCase())))
      // top secondary
      return topSecondary.push(val.clubID)

    // bottom - maybe remove
    // return bottom.push(val)
  })
  return [...topPrimary, ...topSecondary, ...bottom]
}

export const objToArr = (obj: any, filter = (val) => val) => {
  return Object.keys(obj)
    .map((key) => {
      return filter({ clubID: key, ...obj[key] })
    })
    .filter((i) => i !== null)
}

export const translateClubID = (id: string) => {
  return id in clubMap && clubMap[id]
}
