export const isASCII = (text: string): boolean => {
  return /^[\x00-\x7F]*$/.test(text)
}

export const isNumeric = (text: string): boolean => {
  return /^-?\d+$/.test(text)
}

const correction = {
  "์ุ": "ุ์",
  "ุ่": "ุ่",
  "ุ้": "ุ้",
  "ุ๊": "ุ๊",
  "ุ๋": "ุ๋",
  "็ุ": "ุ็",
  "์ิ": "ิ์",
  "่ิ": "ิ่",
  "้ิ": "ิ้",
  "๊ิ": "ิ๊",
  "๋ิ": "ิ๋",
  "็ิ": "ิ็",
  "์ื": "ื์",
  "่ื": "ื่",
  "้ื": "ื้",
  "๊ื": "ื๊",
  "๋ื": "ื๋",
  "็ื": "ื็",
  "์ี": "ี์",
  "่ี": "ี่",
  "้ี": "ี้",
  "๊ี": "ี๊",
  "๋ี": "ี๋",
  "็ี": "ี็",
  "์ึ": "ึ์",
  "่ึ": "ึ่",
  "้ึ": "ึ้",
  "๊ึ": "ึ๊",
  "๋ึ": "ึ๋",
  "็ึ": "ึ็",
  "ิุ์": "ุิ์",
  "์ุิ": "ุิ์",
  "์ิุ": "ุิ์",
  "ิ์ุ": "ุิ์",
  "ุ์ิ": "ุิ์",
  "เเ": "แ",
  "ํา": "ำ",
}

export const fixGrammar = (text: string) => {
  let fixed = text
  Object.keys(correction).forEach((item) => {
    // @ts-ignore
    fixed = fixed?.replace(new RegExp(item, "g"), correction[item])
  })

  return fixed?.replace(/\u200B/g, "").trim()
}

export const textMatch = (a: string, b: string) => {
  const as = fixGrammar(a).split("")
  const bs = fixGrammar(b).split("")

  let ref = as
  let compare = bs

  if (bs.length > as.length) {
      ref = bs
      compare = as
  }

  let match = 0

  compare.forEach((c ,i) => {
      if (c === ref[i]) {
          match++
      }
  })

  return (match / ref.length) * 100
}
