export const sliceArr = (arr: Array<any>, screenWidth) => {
  const breakPoint = 768
  const halfSize = Math.floor(arr.length / 2)
  let odd = [], even = []
  arr.forEach((value, index) => {
    if ((index + 1) % 2 == 0) return even.push(value)
    return odd.push(value)
  })
  if (screenWidth <= breakPoint) return [arr.slice(0, halfSize), arr.slice(halfSize, arr.length)]
  return [odd, even]
}