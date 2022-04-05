export const sliceArr = (arr: Array<any>, screenWidth) => {
  const breakPoint = 768
  const halfSize = Math.floor(arr.length / 2)
  let odd = [],
    even = []
  arr.forEach((value, index) => {
    if ((index + 1) % 2 == 0) return even.push(value)
    return odd.push(value)
  })
  if (screenWidth <= breakPoint) return [arr.slice(0, halfSize), arr.slice(halfSize, arr.length)]
  return [odd, even]
}

export const sliceArrN = (arr, n) => {
  const chunkLength = Math.max(arr.length / n, 1)
  let chunks = []
  for (let i = 0; i < n; i++) {
    if (chunkLength * (i + 1) <= arr.length) chunks.push(arr.slice(chunkLength * i, chunkLength * (i + 1)))
  }
  return chunks
}

export function sliceArrayIntoGroups(arr, size) {
  var step = 0,
    sliceArr = [],
    len = arr.length
  while (step < len) {
    sliceArr.push(arr.slice(step, (step += size)))
  }
  return sliceArr
}
