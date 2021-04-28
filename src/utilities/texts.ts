export const isASCII = (text: string): boolean => {
  return  /^[\x00-\x7F]*$/.test(text)
}

export const isNumeric = (text: string): boolean => {
  return /^-?\d+$/.test(text)
}