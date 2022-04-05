export function moveArray<T>(items: T[], startIndex: number, endIndex: number) {
  const clone = [...items]
  clone[endIndex] = { ...items[startIndex], position: endIndex + 1 }
  clone[startIndex] = { ...items[endIndex], position: startIndex + 1 }
  return clone
}
